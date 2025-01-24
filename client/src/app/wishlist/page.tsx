import Navbar from "@/components/navbar";
import { WishlistModel, getWishlistByUser } from "@/db/models/wishlist";
import { cookies } from "next/headers";
import { readPayloadJose } from "@/utils/jwt";
import { ObjectId } from "mongodb";
import WishlistCard from "@/components/WishlistCard";

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

  const plainWishlists = wishlists.map(item => ({
    _id: item._id.toString(),
    product: item.product ? {
      name: item.product.name,
      thumbnail: item.product.thumbnail,
      price: item.product.price
    } : null
  }));

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        
        {plainWishlists.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">Your wishlist is empty</div>
            <p className="text-sm text-gray-400">Add items that you like to your wishlist</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plainWishlists.map((item) => 
              item.product && (
                <WishlistCard
                  key={item._id}
                  _id={item._id}
                  product={item.product}
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
