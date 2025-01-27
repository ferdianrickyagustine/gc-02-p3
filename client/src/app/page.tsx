import FeaturedCard from "@/components/FeaturedCard";
import Banner from "@/components/Banner";

import Link from "next/link";
import { ProductModel } from "@/db/models/product";

async function getHomeProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?l=5`, {
        cache: 'no-store'
    });
    const data = await res.json();
    return data.data;
}

const HomePage = async () => {
    const getproducts = await getHomeProducts();
    
    // Transform MongoDB documents to plain objects
    const product = getproducts.map((product: ProductModel) => ({
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
                                See all
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                            {product.map((product: ProductModel) => (
                                <FeaturedCard key={product._id.toString()} products={product} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;