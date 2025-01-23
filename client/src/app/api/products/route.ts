import { getProducts } from "@/db/models/product";


type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export const GET = async () => {
  const products = await getProducts()

  // console.log(products, "HALO<<<");
  
  return Response.json(
    {
      statusCode: 200,
      message: "Success get data from products",
      data: products
    },
    {
      status: 200
    }
  )
}
