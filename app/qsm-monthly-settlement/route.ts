import { NextResponse } from 'next/server'

// 2026-09-29 下午 Michael 裁定：月結工作台正式入口改回 system.qsm.group/monthly-settlement。
// 本站曾短暫作為入口，舊連結一律永久轉址到新站。
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SETTLEMENT_ORIGIN = 'https://system.qsm.group/monthly-settlement'

export async function GET(): Promise<Response> {
  return NextResponse.redirect(SETTLEMENT_ORIGIN, { status: 308, headers: { 'Cache-Control': 'no-store, max-age=0' } })
}

export async function POST(): Promise<Response> {
  return NextResponse.redirect(SETTLEMENT_ORIGIN, { status: 308, headers: { 'Cache-Control': 'no-store, max-age=0' } })
}
