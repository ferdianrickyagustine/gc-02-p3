import FeaturedCard from "@/components/FeaturedCard";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { getProducts } from "@/db/models/product";
import Link from "next/link";



const HomePage = async () => {
  const products = await getProducts();
  
  const featured = products.slice(0, 5).map(product => ({
    ...product,
    _id: product._id.toString(),
    createdAt: new Date(product.createdAt).toISOString(),
    updatedAt: new Date(product.updatedAt).toISOString()
  }));

  return (
    <div className="min-h-full bg-[#f5f5f5]">
      <Banner />

      <main className="min-h-full bg-gray-100">
        <section className="bg-white py-6 w-full">
          <div className="max-w-[1188px] mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#424242]">Featured Products</h2>
              <Link href="/products" className="text-blue-600 hover:underline">Lanjutkan Belanja</Link>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <FeaturedCard products={JSON.stringify(featured)} />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
