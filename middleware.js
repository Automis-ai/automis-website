import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  const isLocal = host.startsWith("localhost");
  const isVoice = host.startsWith("voice");

  // Allow /ita on localhost for testing
  if (isLocal) {
    return NextResponse.next();
  }

  // If user is on voice.automis.ai — only allow /ita
  if (isVoice) {
    if (!url.pathname.startsWith("/ita")) {
      url.pathname = "/ita";
      return NextResponse.redirect(url);
    }
  } else {
    // On main domain: block /ita
    if (url.pathname.startsWith("/ita")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Apply to all routes except static assets and API
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
