import { NextResponse } from 'next/server';
import { getProductPagination } from "@/db/models/product";


export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const paginatedData = await getProductPagination(page, limit);
    
    return NextResponse.json(paginatedData, { status: 200 });
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
