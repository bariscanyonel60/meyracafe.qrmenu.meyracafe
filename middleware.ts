import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NO_STORE = "private, no-cache, no-store, max-age=0, must-revalidate";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Cache-Control", NO_STORE);
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Vercel-CDN-Cache-Control", "no-store");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("Surrogate-Control", "no-store");

  // HTML navigasyonunda tarayıcı HTTP önbelleğini temizle.
  const accept = request.headers.get("accept") || "";
  const isDocument =
    request.method === "GET" &&
    (accept.includes("text/html") || accept === "*/*" || accept === "");

  if (isDocument) {
    response.headers.set("Clear-Site-Data", '"cache"');
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|favicon.ico).*)"],
};
