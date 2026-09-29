import { describe, expect, it, vi } from 'vitest'
import {
  buildZoneUrl,
  isSafeZoneSubPath,
  proxySettlementZone,
  readSettlementZoneConfig,
  SETTLEMENT_ZONE_PATH,
} from './settlement-zone'

const ENV = {
  QSM_SETTLEMENT_ZONE_ORIGIN: 'https://qsm-settlement.example.vercel.app',
  QSM_SETTLEMENT_ZONE_BYPASS: 'secret-bypass-token',
}

describe('readSettlementZoneConfig', () => {
  it('accepts a valid https origin and bypass secret', () => {
    expect(readSettlementZoneConfig(ENV)).toEqual({
      origin: 'https://qsm-settlement.example.vercel.app',
      bypassSecret: 'secret-bypass-token',
    })
  })

  it('strips trailing slashes from the origin', () => {
    expect(readSettlementZoneConfig({ ...ENV, QSM_SETTLEMENT_ZONE_ORIGIN: `${ENV.QSM_SETTLEMENT_ZONE_ORIGIN}///` })).toEqual({
      origin: ENV.QSM_SETTLEMENT_ZONE_ORIGIN,
      bypassSecret: ENV.QSM_SETTLEMENT_ZONE_BYPASS,
    })
  })

  it('rejects a non-https origin', () => {
    expect(readSettlementZoneConfig({ ...ENV, QSM_SETTLEMENT_ZONE_ORIGIN: 'http://insecure.example.com' })).toBeNull()
  })

  it('rejects when bypass secret is missing', () => {
    expect(readSettlementZoneConfig({ QSM_SETTLEMENT_ZONE_ORIGIN: ENV.QSM_SETTLEMENT_ZONE_ORIGIN })).toBeNull()
  })

  it('rejects when origin is missing', () => {
    expect(readSettlementZoneConfig({ QSM_SETTLEMENT_ZONE_BYPASS: ENV.QSM_SETTLEMENT_ZONE_BYPASS })).toBeNull()
  })
})

describe('isSafeZoneSubPath', () => {
  it('accepts the empty string', () => {
    expect(isSafeZoneSubPath('')).toBe(true)
  })

  it('accepts a plain relative sub-path', () => {
    expect(isSafeZoneSubPath('/api/status')).toBe(true)
  })

  it('rejects a sub-path missing the leading slash', () => {
    expect(isSafeZoneSubPath('api/status')).toBe(false)
  })

  it('rejects a protocol-relative sub-path (double slash)', () => {
    expect(isSafeZoneSubPath('//evil.example.com/x')).toBe(false)
  })

  it('rejects path traversal', () => {
    expect(isSafeZoneSubPath('/../secrets')).toBe(false)
    expect(isSafeZoneSubPath('/a/../../b')).toBe(false)
  })

  it('rejects backslashes', () => {
    expect(isSafeZoneSubPath('/a\\..\\b')).toBe(false)
  })
})

describe('buildZoneUrl', () => {
  const config = { origin: ENV.QSM_SETTLEMENT_ZONE_ORIGIN, bypassSecret: ENV.QSM_SETTLEMENT_ZONE_BYPASS }

  it('builds the root URL for an empty sub-path', () => {
    expect(buildZoneUrl(config, '')).toBe(`${config.origin}${SETTLEMENT_ZONE_PATH}`)
  })

  it('builds a sub-path URL', () => {
    expect(buildZoneUrl(config, '/_next/static/chunk.js')).toBe(
      `${config.origin}${SETTLEMENT_ZONE_PATH}/_next/static/chunk.js`,
    )
  })

  it('returns null for an unsafe sub-path', () => {
    expect(buildZoneUrl(config, '//evil.example.com')).toBeNull()
  })
})

describe('proxySettlementZone', () => {
  it('returns 503 when not configured', async () => {
    const res = await proxySettlementZone('', {}, vi.fn(), {})
    expect(res.status).toBe(503)
  })

  it('returns 502 when the upstream fetch throws', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('network down'))
    const res = await proxySettlementZone('', {}, fetchImpl, ENV)
    expect(res.status).toBe(502)
  })

  it('sends the bypass header, forwards the cookie, and passes Set-Cookie back', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response('ok', {
        status: 200,
        headers: [
          ['Content-Type', 'text/html'],
          ['Set-Cookie', 'session=abc; Path=/qsm-monthly-settlement; HttpOnly'],
          ['Set-Cookie', 'other=xyz; Path=/'],
        ],
      }),
    )

    const res = await proxySettlementZone(
      '/dashboard',
      { cookie: 'session=abc; other=xyz' },
      fetchImpl,
      ENV,
    )

    expect(fetchImpl).toHaveBeenCalledTimes(1)
    const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit]
    expect(url).toBe(`${ENV.QSM_SETTLEMENT_ZONE_ORIGIN}${SETTLEMENT_ZONE_PATH}/dashboard`)
    const sentHeaders = init.headers as Headers
    expect(sentHeaders.get('x-vercel-protection-bypass')).toBe(ENV.QSM_SETTLEMENT_ZONE_BYPASS)
    expect(sentHeaders.get('Cookie')).toBe('session=abc; other=xyz')
    expect(init.redirect).toBe('manual')
    expect(init.cache).toBe('no-store')

    expect(res.status).toBe(200)
    expect(res.headers.get('Cache-Control')).toBe('no-store, max-age=0')
    expect(res.headers.get('Content-Type')).toBe('text/html')
    const setCookies = res.headers.getSetCookie()
    expect(setCookies).toEqual([
      'session=abc; Path=/qsm-monthly-settlement; HttpOnly',
      'other=xyz; Path=/',
    ])
  })

  it('never forwards browser-supplied identity headers upstream', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }))
    await proxySettlementZone('/', { cookie: 'a=b' }, fetchImpl, ENV)
    const [, init] = fetchImpl.mock.calls[0] as [string, RequestInit]
    const sentHeaders = init.headers as Headers
    expect(sentHeaders.get('x-qsm-settlement-login')).toBeNull()
    expect(sentHeaders.get('x-qsm-settlement-role')).toBeNull()
    expect(sentHeaders.get('x-qsm-settlement-timestamp')).toBeNull()
    expect(sentHeaders.get('x-qsm-settlement-signature')).toBeNull()
  })

  it('passes through a relative redirect', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(null, {
        status: 303,
        headers: { Location: '/qsm-monthly-settlement/dashboard' },
      }),
    )
    const res = await proxySettlementZone('', {}, fetchImpl, ENV)
    expect(res.status).toBe(303)
    expect(res.headers.get('Location')).toBe('/qsm-monthly-settlement/dashboard')
  })

  it('forwards the real client ip under a dedicated header', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }))
    await proxySettlementZone('/api/session', { method: 'POST', clientIp: '203.0.113.9' }, fetchImpl, ENV)
    const headers = fetchImpl.mock.calls[0][1].headers as Headers
    expect(headers.get('x-qsm-settlement-client-ip')).toBe('203.0.113.9')
  })

  it('rewrites an absolute redirect on the zone origin to a relative path', async () => {
    const origin = ENV.QSM_SETTLEMENT_ZONE_ORIGIN as string
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(null, {
        status: 303,
        headers: { Location: `${origin}/qsm-monthly-settlement/?auth_error=credentials` },
      }),
    )
    const res = await proxySettlementZone('/api/session', { method: 'POST' }, fetchImpl, ENV)
    expect(res.status).toBe(303)
    expect(res.headers.get('Location')).toBe('/qsm-monthly-settlement/?auth_error=credentials')
  })

  it('returns 502 for an absolute (SSO) redirect instead of leaking it', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(null, {
        status: 307,
        headers: { Location: 'https://vercel.com/sso-api/login' },
      }),
    )
    const res = await proxySettlementZone('', {}, fetchImpl, ENV)
    expect(res.status).toBe(502)
  })

  it('returns 502 for a protocol-relative redirect', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(null, {
        status: 302,
        headers: { Location: '//evil.example.com/steal' },
      }),
    )
    const res = await proxySettlementZone('', {}, fetchImpl, ENV)
    expect(res.status).toBe(502)
  })
})
