import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { readPayloadJose } from "@/utils/jwt";
import { ObjectId } from "mongodb";
import { addToWishlist } from "@/db/models/wishlist";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

const wishlistSchema = z.object({
  productId: z.string().min(1, "Product ID is required")
});

export async function POST(request: NextRequest) {
  try {
    const uid = request.headers.get("x-user-id");
    console.log(uid, "<<<<<<<<<<<<<")
    
    if (!uid) {
      return NextResponse.json<MyResponse<null>>({
        statusCode: 401,
        error: "Unauthorized - Please login first"
      }, { status: 401 });
    }

    const body = await request.json();
    const validatedBody = wishlistSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json<MyResponse<null>>({
        statusCode: 400,
        error: validatedBody.error.errors[0].message
      }, { status: 400 });
    }

    const userId = new ObjectId(uid);
    const productId = new ObjectId(validatedBody.data.productId);

    const result = await addToWishlist(userId, productId);

    return NextResponse.json<MyResponse<typeof result>>({
      statusCode: 201,
      message: "Successfully added to wishlist",
      data: result
    }, { status: 201 });

  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json<MyResponse<null>>({
      statusCode: 500,
      error: "Internal server error"
    }, { status: 500 });
  }
}