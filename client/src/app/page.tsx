import FeaturedCard from "@/components/FeaturedCard";
import Banner from "@/components/Banner";
import { getProducts } from "@/db/models/product";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function fetchData(
  search? : string,
  page: number = 1,
  limit: number = 5
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

const HomePage = async () => {
  const rawProducts = await getProducts();
  
  // Transform MongoDB documents to plain objects
  const products = rawProducts.slice(0, 5).map(product => ({
    _id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    description: product.description,
    excerpt: product.excerpt,
    price: product.price,
    tags: product.tags,
    thumbnail: product.thumbnail,
    images: product.images,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt)
  }));

  return (
    <div className="min-h-full bg-[#f5f5f5]">
      <Banner />

      <main className="min-h-full">
        <section className="bg-white py-6 w-full">
          <div className="max-w-[1188px] mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#424242]">Featured Products</h2>
              <Link href="/products" className="text-sm text-blue-600 hover:underline">
                Lanjutkan Belanja
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
              {products.map((product) => (
                <FeaturedCard key={product._id} products={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
