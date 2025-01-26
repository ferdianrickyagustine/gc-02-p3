"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteWishlist as deleteWishlistDb } from '@/db/models/wishlist'
import { readPayloadJose } from "@/utils/jwt";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getWishlists = async () => {
    try {

        const response = await fetch(`${BASE_URL}/api/wishlist`, {
            headers: {
                Cookie:  (await cookies()).toString()
            },
            cache: "no-store"
        });

        // console.log(response, "<<<<<<<<<<<<<<<<<<< ini response wishlist");
        
        if (!response.ok) {
            throw new Error("Failed to fetch wishlists");
        }

        const data = await response.json();
        // console.log(data, "<<<<<<<<<<<<<<<<<<< ini data wishlist");
        
        return data.data || [];
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

export const addToWishlist = async (productId: string) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        // console.log(token, "<<<<<<<<<<<<<<<<<<< ini token");
        
        if (!token) {
            redirect("/login");
        }

        const payload = await readPayloadJose<{ id: string }>(token.value)
        const response = await fetch(`${BASE_URL}/api/wishlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
                "x-user-id": payload.id
            },
            body: JSON.stringify({ productId })
        });

        if (!response.ok) {
            throw new Error("Failed to add wishlist");
        }

        revalidatePath("/wishlist");
        redirect("/wishlist");
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export async function deleteWishlist(id: string) {
    try {
        await deleteWishlistDb(id)
        return { success: true }
    } catch (error) {
        console.error('Error:', error)
        throw new Error('Failed to delete wishlist')
    }
}
