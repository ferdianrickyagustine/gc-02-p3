"use client";

import { ProductModel } from "@/db/models/product";

const FeaturedCard = ({ products }: { products: string }) => {
  const parsedProducts = JSON.parse(products) as ProductModel[];
  
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {parsedProducts.map((product) => (
        <div
          key={product._id.toString()}
          className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
        >
          {/* Image Container */}
          <div className="relative pt-[100%] overflow-hidden">
            <img
              src={product.thumbnail || 'https://placehold.co/300x300/png?text=No+Image'}
              alt={product.name}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-3 flex flex-col flex-grow">
            <h3 className="text-sm text-gray-600 mb-2 line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>

            <div className="mt-auto flex justify-between items-center">
              <div className="text-[#f57224] text-lg font-medium">
                {formatRupiah(product.price)}
              </div>
              
              {/* Wishlist Button */}
              <button 
                className="text-gray-400 hover:text-[#f57224] transition-colors duration-200"
                aria-label="Add to wishlist"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 1024 1024"
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M983.384 381.465c0-147.456-119.467-266.923-266.923-266.923-81.465 0-154.283 36.409-203.207 93.866-48.925-57.458-121.856-93.866-203.207-93.866-147.456 0-266.923 119.467-266.923 266.923 0 77.369 35.613 142.109 85.561 195.811L514.275 947.964l378.994-366.592c48.014-50.062 90.112-120.377 90.112-199.907Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>

  );
};

export default FeaturedCard;
