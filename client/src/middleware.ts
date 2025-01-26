import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayloadJose } from "@/utils/jwt";

export async function middleware(request: NextRequest) {
    if (request.url.includes("/wishlist")) {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        const urlLogin = new URL("/login", request.url);

        if (!token?.value) {
            return NextResponse.redirect(urlLogin);
        }

        try {
            const dataOfToken = await readPayloadJose<{
                id: string;
                name: string;
                username: string;
                email: string;
            }>(token.value);

            const reqHeaders = new Headers(request.headers);
            reqHeaders.set("x-user-id", dataOfToken.id);
            reqHeaders.set("x-user-email", dataOfToken.email);
            
            return NextResponse.next({
                headers: reqHeaders,
            });
        } catch (error) {
            console.error("Error:", error);
            return NextResponse.redirect(urlLogin);
        }
    }

    return NextResponse.next();
}   