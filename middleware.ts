import { NextRequest, NextResponse } from "next/server";

// Internal-only pages: reachable only with the shared access code
// (?code=... once, then a cookie). Everything else on the site is untouched.
const COOKIE_NAME = "sg_internal";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function deriveToken(code: string): Promise<string> {
  const data = new TextEncoder().encode(`saiens-internal-gate:${code}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  const code = process.env.INTERNAL_GATE_CODE;
  // Fail closed: if the gate code is not configured, the pages stay hidden.
  if (!code) return new NextResponse(null, { status: 404 });

  const expected = await deriveToken(code);

  if (req.cookies.get(COOKIE_NAME)?.value === expected) {
    return NextResponse.next();
  }

  const supplied = req.nextUrl.searchParams.get("code");
  if (supplied && (await deriveToken(supplied)) === expected) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("code");
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE_NAME, expected, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
    return res;
  }

  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: [
    "/future/:path*",
    "/team-h2/:path*",
    "/odoo-development/:path*",
  ],
};
