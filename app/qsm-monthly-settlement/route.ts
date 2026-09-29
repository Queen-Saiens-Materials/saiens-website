import { proxySettlementZone } from '@/lib/settlement-zone'

// qsm-settlement 的入口頁（basePath 根路徑）。此站不驗證使用者，單純轉發到上游——
// 上游自己的 Odoo 登入與 session cookie 決定看得到什麼。詳見 lib/settlement-zone.ts。
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request): Promise<Response> {
  return proxySettlementZone('', {
    cookie: request.headers.get('Cookie'),
    accept: request.headers.get('Accept'),
  })
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.arrayBuffer()
  return proxySettlementZone('', {
    method: 'POST',
    body,
    contentType: request.headers.get('Content-Type'),
    cookie: request.headers.get('Cookie'),
    accept: request.headers.get('Accept'),
  })
}

export async function HEAD(request: Request): Promise<Response> {
  return GET(request)
}
