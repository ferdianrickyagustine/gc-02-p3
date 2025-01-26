import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteWishlist } from "@/db/models/wishlist";

interface RouteContext {
    params: {
        id: string;
    };
}

export async function DELETE(
    _request: NextRequest,
    context: RouteContext
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

        const result = await deleteWishlist(context.params.id);

        if (!result.deletedCount) {
            return NextResponse.json(
                {
                    statusCode: 404,
                    error: "Wishlist item not found",
                },
                { status: 404 }
            );
        }

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