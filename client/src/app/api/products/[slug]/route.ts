import { getProductBySlug } from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  
  const { slug } = await params;
  
  const product = await getProductBySlug(slug);

  return NextResponse.json<MyResponse<unknown>>({
    statusCode: 200,
    message: `Success read product detail`,
    data: product,
  });
};
