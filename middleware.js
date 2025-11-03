import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  const isLocal = host.startsWith("localhost");
  const isVoice = host.startsWith("voice");

  // ✅ Always allow everything locally
  if (isLocal) {
    return NextResponse.next();
  }

  // ✅ Voice domain → always redirect to /ita
  if (isVoice) {
    // If not already exactly /ita, redirect there
    if (url.pathname !== "/ita") {
      url.pathname = "/ita";
      url.search = ""; // optional: clear query params
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ✅ Main domain → block /ita
  if (url.pathname.startsWith("/ita")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ✅ Exclude static assets and API routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|assets).*)",
  ],
};
