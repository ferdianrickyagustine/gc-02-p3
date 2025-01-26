import { NextResponse, NextRequest } from 'next/server';
import { getProducts } from "@/db/models/product";


export async function GET(request: NextRequest) {
  try {
  const search = request.nextUrl.searchParams.get("q");
    const limit = request.nextUrl.searchParams.get("l");
    const page = request.nextUrl.searchParams.get("p");

    const limitNumber = limit ? parseInt(limit) : 10;
    const pagination = page ? parseInt(page) : 1;

    const products = await getProducts(search || undefined, pagination, limitNumber);

    return NextResponse.json(
      {
        statusCode: 200,
        data: products
      },
      {
        status: 200
      }
    );

  } catch (error) {
    console.error('Error:', error);
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
