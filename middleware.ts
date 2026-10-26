import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NO_STORE = "private, no-cache, no-store, max-age=0, must-revalidate";

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("Cache-Control", NO_STORE);
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Vercel-CDN-Cache-Control", "no-store");
  response.headers.set("x-nextjs-stale-time", "0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|favicon.ico).*)"],
};
