// import { NextRequest, NextResponse } from "next/server";
// import { verifyJwt } from "./utils/jwtToken";

// export function authMiddleware(req: NextRequest) {

//   const PUBLIC_PATHS = ["/api/auth/login", "/api/auth/register"];
  
//   if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
//     return;
//   }
  
//   const authHeader = req.headers.get("Authorization");
//   if (!authHeader?.startsWith("Bearer ")) {
//     return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
//   }

//   const token = authHeader.split(" ")[1];
//   const payload = verifyJwt(token);

//   if (!payload) {
//     return NextResponse.json({ message: "Token inválido ou expirado" }, { status: 401 });
//   }

//   return payload;
// }

// export const config = {
//     matcher: [
//         "/((?!_next/static|_next/image|favicon.ico).*)",
//     ],
// };
