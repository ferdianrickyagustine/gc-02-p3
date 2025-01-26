'use client';

import { useRouter } from 'next/navigation';
import { deleteWishlist } from '@/app/wishlist/action';
import { toast } from 'sonner';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

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
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
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
        <div
            className="relative w-[220px] bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl transition-all duration-200 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full h-[220px] overflow-hidden">
                <Image 
                    src={product.thumbnail} 
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
                    unoptimized
                />
                <button
                    onClick={handleDelete}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-sm"
                    aria-label="Remove from Wishlist"
                >
                    <Trash2 className="w-5 h-5 text-red-500" />
                </button>
            </div>

            <div className="p-3 flex flex-col gap-2">
                <h3 className="text-sm text-gray-900 line-clamp-2 leading-tight hover:text-orange-500 transition-colors duration-200">
                    {product.name}
                </h3>
                
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-orange-500">
                        Rp {product.price.toLocaleString('id-ID')}
                    </span>
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

export default WishlistCard;
