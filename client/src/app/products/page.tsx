import FeaturedCard from "@/components/FeaturedCard";
import Navbar from "@/components/navbar";
import { getProductByName, getProducts } from "@/db/models/product";

const ProductPage = async({ searchParams }: { searchParams: { search?: string } }) => {
  const products = searchParams.search 
    ? await getProductByName(searchParams.search)
    : await getProducts();
  
  // Transform MongoDB objects to plain objects
  const transformedProducts = products.map(product => ({
    ...product,
    _id: product._id.toString(),
    createdAt: new Date(product.createdAt).toISOString(),
    updatedAt: new Date(product.updatedAt).toISOString()
  }));
  
  return (
    <>
      <Navbar />
      <main className="max-w-[1188px] mx-auto px-4 py-6">
        {searchParams.search && (
          <h2 className="text-xl font-semibold mb-4">
            Search results for: {searchParams.search}
          </h2>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <FeaturedCard products={JSON.stringify(transformedProducts)}/>
        </div>
      </main>
    </>
  );
};

export default ProductPage;