"use client";

import { ProductModel } from "@/db/models/product";


const FeaturedCard = ({ products }: { products: string }) => {
  const parsedProducts = JSON.parse(products) as ProductModel[]
  const formatRupiah = (price: number) => {
    return price.toLocaleString("id-ID");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {parsedProducts.map((product) => (
        <div
          key={product._id.toString()}
          className="bg-white w-full border shadow-sm flex flex-col hover:drop-shadow-2xl hover:bg-gray-300"
        >
          <div className="w-full h-full overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-sm font-semibold p-2 flex-grow overflow-hidden leading-tight line-clamp-2">
            {product.name}
          </h3>

          <label className="text-red-400 text-xl font-semibold p-2 flex-grow overflow-hidden leading-tight line-clamp-2">
            Rp. {formatRupiah(product.price)}{" "}
          </label>

          <div className="flex items-center justify-center p-5 mt-auto">
            <button className="text-gray-500 group hover:text-red-500 focus:outline-none">
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 1024 1024"
                className="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 983.384 381.465 c 0 -147.456 -119.467 -266.923 -266.923 -266.923 c -81.4649 0 -154.283 36.4089 -203.207 93.8662 c -48.9245 -57.4578 -121.856 -93.8662 -203.207 -93.8662 c -147.456 0 -266.923 119.467 -266.923 266.923 c 0 77.3689 35.6125 142.109 85.5609 195.811 L 514.275 947.964 l 378.994 -366.592 c 48.0142 -50.0622 90.112 -120.377 90.112 -199.907 Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCard;
