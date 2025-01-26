"use client";

import { ProductModel } from "@/db/models/product";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { addWishlist } from "@/app/wishlist/action";
import { useRouter } from "next/navigation";
import { Heart } from 'lucide-react';

const FeaturedCard = ({ products }: { products: ProductModel }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const hasDiscount = products.price > 5000000;
  const discountAmount = hasDiscount ? 15 : 0; // Example discount percentage
  const originalPrice = products.price;
  const discountedPrice = hasDiscount ? products.price * (1 - discountAmount / 100) : products.price;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCardClick = () => {
    router.push(`/products/${products.slug}`);
  };

  const AddWishlistButton = ({ productId }: { productId: string }) => {
    const router = useRouter();
  
    const addToWishlist = async (productId: string) => {
      try {
        await addWishlist(productId);
        toast.success("Berhasil menambahkan ke wishlist!");
        router.refresh();
      } catch (error) {
        toast.error("Gagal menambahkan ke wishlist");
        console.error("Gagal menambahkan ke wishlist:", error);
      }
    };
  
    return (
      <button
        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-sm"
        onClick={(e) => {
          e.stopPropagation();
          addToWishlist(productId);
        }}
        aria-label="Add to Wishlist"
      >
        <Heart className="w-5 h-5 text-red-500" />
      </button>
    );
  };

  return (
    <div
      className="relative w-[220px] bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl transition-all duration-200 cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[220px] overflow-hidden">
        {hasDiscount && (
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              -{discountAmount}%
            </span>
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              Mall
            </span>
          </div>
        )}
        <Image
          src={products.thumbnail}
          alt={products.name}
          fill
          className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
          unoptimized
        />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-sm text-gray-900 line-clamp-2 leading-tight hover:text-orange-500 transition-colors duration-200">
          {products.name}
        </h3>
        
        <AddWishlistButton productId={products._id.toString()} />
        <div className="flex flex-col">
          <span className="text-lg font-bold text-orange-500">
            Rp {formatPrice(discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-500 line-through">
              Rp {formatPrice(originalPrice)}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center">
            <span className="text-xs text-gray-500">⭐ 4.9</span>
            <span className="mx-1 text-gray-300">|</span>
            <span className="text-xs text-gray-500">Terjual 1rb+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;