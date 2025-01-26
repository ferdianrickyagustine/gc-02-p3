'use server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchData(
    search? : string,
    page: number = 1,
    limit: number = 10
) {   
        const url = search?`${BASE_URL}/api/products?q=${encodeURIComponent(search || '')}&l=${limit}&p=${page}`: `${BASE_URL}/api/products?l=${limit}&p=${page}`;
        const response = await fetch(url, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        return response.json();
}