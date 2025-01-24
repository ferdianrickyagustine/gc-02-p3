import Navbar from "@/components/navbar";
import { WishlistModel, getWishlistByUser } from "@/db/models/wishlist";
import { cookies } from "next/headers";
import { readPayloadJose } from "@/utils/jwt";
import { ObjectId } from "mongodb";

const WishlistPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  
  let wishlists: WishlistModel[] = [];
  if (token) {
    const payload = await readPayloadJose<{ id: string }>(token.value);
    if (payload.id && typeof payload.id === 'string') {
      wishlists = await getWishlistByUser(new ObjectId(payload.id));
    }
  }

  const formatRupiah = (price: number) => {
    return price.toLocaleString("id-ID");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        
        {wishlists.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">Your wishlist is empty</div>
            <p className="text-sm text-gray-400">Add items that you like to your wishlist</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlists.map((item: any) => (
              <div key={item._id.toString()} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <button 
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
                    {item.product.name}
                  </h3>
                  <div className="text-red-500 font-bold mb-4">
                    Rp {formatRupiah(item.product.price)}
                  </div>
                  <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
