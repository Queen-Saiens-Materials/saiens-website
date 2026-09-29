// qsm-settlement 專案代理：qsm-settlement 是另一個 Vercel team 下、有自己 Odoo 登入與
// session cookie 的受保護部署（Vercel Standard Protection，basePath /qsm-monthly-settlement）。
// 本站不驗證使用者、不簽發身分——單純把瀏覽器的 Cookie 原樣轉發給上游，並把上游的
// Set-Cookie 原樣帶回瀏覽器，讓上游自己的登入機制運作。因此本檔「不得」加上任何
// x-qsm-settlement-* 之類的身分 header（那是 qsm-system 那個有站內帳號系統的案例才需要）。
// 上游部署 URL 由 QSM_SETTLEMENT_ZONE_ORIGIN 設定，secrets 不入 git。
// 內容含公司間結算明細與內轉單價，一律 no-store。

export const SETTLEMENT_ZONE_PATH = '/qsm-monthly-settlement'

const NO_STORE = 'no-store, max-age=0'

export interface SettlementZoneConfig {
  origin: string
  bypassSecret: string
}

export function readSettlementZoneConfig(
  env: Record<string, string | undefined> = process.env,
): SettlementZoneConfig | null {
  const origin = env.QSM_SETTLEMENT_ZONE_ORIGIN?.trim().replace(/\/+$/, '') ?? ''
  const bypassSecret = env.QSM_SETTLEMENT_ZONE_BYPASS?.trim() ?? ''
  if (!/^https:\/\/[a-z0-9.-]+$/i.test(origin) || !bypassSecret) return null
  return { origin, bypassSecret }
}

// 只接受站內相對子路徑（'' 或 '/...'），拒絕任何可能改變上游主機或跳脫路徑的輸入
export function isSafeZoneSubPath(subPath: string): boolean {
  if (subPath === '') return true
  if (!subPath.startsWith('/') || subPath.startsWith('//')) return false
  if (subPath.includes('..') || subPath.includes('\\')) return false
  return true
}

export function buildZoneUrl(config: SettlementZoneConfig, subPath: string): string | null {
  if (!isSafeZoneSubPath(subPath)) return null
  return `${config.origin}${SETTLEMENT_ZONE_PATH}${subPath}`
}

export interface ZoneRequestOptions {
  method?: 'GET' | 'POST'
  body?: ArrayBuffer | null
  contentType?: string | null
  cookie?: string | null
  accept?: string | null
  clientIp?: string | null
}

export async function proxySettlementZone(
  subPath: string,
  options: ZoneRequestOptions = {},
  fetchImpl: typeof fetch = fetch,
  env: Record<string, string | undefined> = process.env,
): Promise<Response> {
  const config = readSettlementZoneConfig(env)
  if (!config) {
    return new Response('Settlement zone not configured', {
      status: 503,
      headers: { 'Cache-Control': NO_STORE },
    })
  }

  const url = buildZoneUrl(config, subPath)
  if (!url) return new Response('Not found', { status: 404, headers: { 'Cache-Control': NO_STORE } })

  // 身分一律靠瀏覽器帶來的 Cookie 本身（上游自己的 session），不附加任何
  // x-qsm-settlement-* 識別 header——即使瀏覽器送來也不轉發。
  const headers = new Headers({ 'x-vercel-protection-bypass': config.bypassSecret })
  if (options.cookie) headers.set('Cookie', options.cookie)
  // 上游的登入失敗次數限制以來源 IP 計數；經代理後上游只看得到本站的出口 IP，
  // 必須把真實使用者 IP 另外帶過去（瀏覽器自己送的同名 header 一律被這裡覆蓋）。
  if (options.clientIp) headers.set('x-qsm-settlement-client-ip', options.clientIp)
  if (options.contentType) headers.set('Content-Type', options.contentType)
  if (options.accept) headers.set('Accept', options.accept)

  let upstream: Response
  try {
    upstream = await fetchImpl(url, {
      method: options.method ?? 'GET',
      ...(options.body != null && (options.method ?? 'GET') === 'POST' ? { body: options.body } : {}),
      headers,
      cache: 'no-store',
      redirect: 'manual',
    })
  } catch (error: unknown) {
    console.error('[settlement-zone] upstream fetch failed', error)
    return new Response('Bad gateway', { status: 502, headers: { 'Cache-Control': NO_STORE } })
  }

  const responseHeaders = new Headers({ 'Cache-Control': NO_STORE })
  const contentType = upstream.headers.get('Content-Type')
  if (contentType) responseHeaders.set('Content-Type', contentType)
  for (const setCookie of upstream.headers.getSetCookie()) {
    responseHeaders.append('Set-Cookie', setCookie)
  }

  if (upstream.status >= 300 && upstream.status < 400) {
    const rawLocation = upstream.headers.get('Location') ?? ''
    // 上游（Next.js）用 request.url 組出的絕對導向會帶自己的部署主機名；
    // 只要主機是設定的 zone origin 就改回站內相對路徑。其他絕對網址視為未預期
    //（bypass 失效被導去 Vercel SSO），不得把 SSO 頁洩漏給使用者。
    const location = rawLocation.startsWith(`${config.origin}/`)
      ? rawLocation.slice(config.origin.length)
      : rawLocation
    if (location.startsWith('/') && !location.startsWith('//')) {
      responseHeaders.set('Location', location)
      return new Response(null, { status: upstream.status, headers: responseHeaders })
    }
    console.error(`[settlement-zone] unexpected upstream redirect ${upstream.status} for ${subPath}`)
    return new Response('Bad gateway', { status: 502, headers: { 'Cache-Control': NO_STORE } })
  }

  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders })
}
