'use client';

import { useRouter } from 'next/navigation';

type WishlistCardProps = {
  _id: string;
  product: {
    name: string;
    thumbnail: string;
    price: number;
  };
};

const WishlistCard = ({ _id, product }: WishlistCardProps) => {
  const router = useRouter();

  const formatRupiah = (price: number) => {
    return price.toLocaleString("id-ID");
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/wishlist/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete wishlist item');
      }

      // Refresh the page to show updated wishlist
      router.refresh();
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
      alert('Failed to delete wishlist item');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <button 
          onClick={handleDelete}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
          aria-label="Remove from wishlist"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="text-red-500 font-bold mb-4">
          Rp {formatRupiah(product.price)}
        </div>
        <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
