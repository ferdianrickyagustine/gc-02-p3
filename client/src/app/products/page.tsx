'use client'

import FeaturedCard from "@/components/FeaturedCard";
import { ProductModel } from "@/db/models/product";
import {  useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchData } from "./action";
import { useSearchParams } from "next/navigation";

const ProductPage =  () => {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const searchQuery = searchParams?.get("q") || '' ;

    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
    }, [searchQuery]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetchData(searchQuery, page, 12);
                if (response.data.length === 0) {
                    setHasMore(false);
                }
                if (page === 1) {
                    setProducts(response.data);
                } else {
                    setProducts((prev) => [...prev, ...response.data]);
                }
                setHasMore(response.data.length > 0);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } 
        }

        loadProducts();
    }, [page, searchQuery]);

    const moreFetch = () => {
        setPage((prev) => prev + 1);
    };

    // const transformedProducts = products.map(product => ({
    //     ...product,
    //     _id: product._id.toString(),
    //     createdAt: new Date(product.createdAt).toISOString(),
    //     updatedAt: new Date(product.updatedAt).toISOString()
    // }));
  
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-4">
                <h1 className="text-xl font-medium text-gray-800 mb-4">
                    Explore Our Products
                </h1>
                <InfiniteScroll
                    dataLength={products.length}
                    next={moreFetch}
                    hasMore={hasMore}
                    loader={<p className="text-center py-4">Loading...</p>}
                    endMessage={<p className="text-center py-4 text-gray-500">No more products</p>}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
                        {products.map((product) => (
                            <FeaturedCard key={product._id.toString()} products={product} />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default ProductPage;