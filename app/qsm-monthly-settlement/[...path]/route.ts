import { proxySettlementZone } from '@/lib/settlement-zone'

// qsm-settlement 的資產、子路徑與 API 代理（basePath /qsm-monthly-settlement 下的所有
// 子路徑，含 _next/* 靜態資產與 api/*）。此站不驗證使用者、不簽發身分——瀏覽器的
// Cookie 原樣轉發、上游的 Set-Cookie 原樣帶回，讓上游自己的 Odoo 登入運作。
// 即使瀏覽器帶來 x-qsm-settlement-* 也一律不轉發（那是別的案例才用的身分 header）。
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function subPathFrom(request: Request, path: string[]): string {
  const search = new URL(request.url).search
  return `/${path.map(encodeURIComponent).join('/')}${search}`
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  const { path } = await context.params
  return proxySettlementZone(subPathFrom(request, path), {
    cookie: request.headers.get('Cookie'),
    accept: request.headers.get('Accept'),
  })
}

export async function POST(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  const { path } = await context.params
  const body = await request.arrayBuffer()
  return proxySettlementZone(subPathFrom(request, path), {
    method: 'POST',
    body,
    contentType: request.headers.get('Content-Type'),
    cookie: request.headers.get('Cookie'),
    accept: request.headers.get('Accept'),
  })
}

export async function HEAD(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  return GET(request, context)
}
