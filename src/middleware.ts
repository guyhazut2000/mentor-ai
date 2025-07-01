import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
