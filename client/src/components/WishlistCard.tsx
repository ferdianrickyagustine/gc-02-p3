'use client';

import { useRouter } from 'next/navigation';
import { deleteWishlist } from '@/app/wishlist/action';
import { toast } from 'sonner';
import Image from 'next/image';

type WishlistCardProps = {
    _id: string;
    product: {
        name: string;
        price: number;
        thumbnail: string;
    };
};

const WishlistCard = ({ _id, product }: WishlistCardProps) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await deleteWishlist(_id);
            toast.success('Berhasil dihapus dari wishlist! 🗑️');
            router.refresh();
        } catch (error) {
            console.error("Error:", error);
            toast.error('Gagal menghapus dari wishlist 😢');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative h-48 mb-4">
                <Image 
                    src={product.thumbnail} 
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-md"
                />
            </div>
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">
                Rp {product.price.toLocaleString('id-ID')}
            </p>
            <button
                onClick={handleDelete}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
                Hapus dari Wishlist
            </button>
        </div>
    );
};

export default WishlistCard;
