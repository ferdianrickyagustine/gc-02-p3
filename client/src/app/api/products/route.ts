import { NextResponse } from 'next/server';
import { getProducts } from "@/db/models/product";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const allProducts = await getProducts();
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = allProducts.slice(start, end);

    return NextResponse.json(
      {
        statusCode: 200,
        message: "Success get data from products",
        data: paginatedProducts
      },
      {
        status: 200
      }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        statusCode: 500,
        error: 'Failed to fetch products'
      },
      {
        status: 500
      }
    );
  }
}
