import { NextResponse } from 'next/server';
import { getProductPagination } from "@/db/models/product";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const paginatedData = await getProductPagination(page, limit);
    
    return NextResponse.json(paginatedData, { status: 200 });
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
