import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteWishlist } from "@/db/models/wishlist";

export async function DELETE(
    _req: Request,
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get id from URL
        const id = _req.url.split('/').pop();
        
        if (!id) {
            return NextResponse.json(
                { error: "ID not found" },
                { status: 400 }
            );
        }

        await deleteWishlist(id);

        return NextResponse.json(
            {
                statusCode: 200,
                message: "Wishlist item deleted successfully",
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            {
                statusCode: 500,
                error: "Internal server error",
            },
            { status: 500 }
        );
    }
}