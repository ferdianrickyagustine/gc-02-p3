'use client'

import Link from "next/link";

const HomeMore = () => {

  return (
    <div className="w-screen px-20 mt-5 flex items-center">
      <label className="text-2xl mr-4 w-full">Featured Product</label>
      <div className="text-right w-full">
        <Link href="/products" className="text-blue-600 hover:underline">Lanjutkan Belanja</Link>
      </div>
    </div>
  );
};

export default HomeMore
