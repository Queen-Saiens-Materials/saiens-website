import { NextResponse } from 'next/server'

// 舊入口的子路徑轉到新站對應路徑（例如 /periods/2026-08-25）。
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SETTLEMENT_ORIGIN = 'https://system.qsm.group/monthly-settlement'

async function redirect(request: Request, context: { params: Promise<{ path: string[] }> }): Promise<Response> {
  const { path } = await context.params
  const search = new URL(request.url).search
  return NextResponse.redirect(`${SETTLEMENT_ORIGIN}/${path.map(encodeURIComponent).join('/')}${search}`, {
    status: 308, headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}

export const GET = redirect
export const POST = redirect
