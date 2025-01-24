'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <div className="bg-gray-200 text-gray-400 flex justify-end gap-8 mr-20 z-40">
        <Link href="/">
          <label className="text-base cursor-pointer">Home</label>
        </Link>
        <Link href="/wishlist">
          <label className="text-base cursor-pointer">Wishlist</label>
        </Link>
        <Link href="/login">
          <label className="text-base cursor-pointer">Login</label>
        </Link>
        <Link href="/register">
          <label className="text-base cursor-pointer">Daftar</label>
        </Link>
      </div>

      <div className="sticky top-0 bg-white flex p-2 justify-around items-center border-b border-gray-300 z-50">
        <Link href="/">
          <div className="flex items-center ml-10">
            <img
              src="https://img.lazcdn.com/g/tps/images/ims-web/TB1Hs8GaMFY.1VjSZFnXXcFHXXa.png"
              className="w-5/12 h-5/12"
              alt="Lazada"
            />
          </div>
        </Link>
        <form onSubmit={handleSearch} className="flex items-center hidden md:inline-flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari di Lazada"
            className="w-96 border bg-gray-200 border-gray-200 rounded-l-md py-1 px-2"
          />
          <button type="submit" className="w-1/12 h-full py-1 px-1 bg-orange-500 border-b border-gray-200 mr-40 flex justify-center">
            <svg
              className="h-6 w-6 text-gray-400 hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="white"
              />
            </svg>
          </button>
        </form>
        <div className="flex items-center gap-2">
          <button className="border px-2 py-1 rounded-md mr-10">
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g id="icomoon-ignore"></g>
              <path
                d="M30.622 9.602h-22.407l-1.809-7.464h-5.027v1.066h4.188l5.198 21.443c-1.108 0.323-1.923 1.334-1.923 2.547 0 1.472 1.193 2.666 2.666 2.666s2.666-1.194 2.666-2.666c0-0.603-0.208-1.153-0.545-1.599h7.487c-0.337 0.446-0.545 0.997-0.545 1.599 0 1.472 1.193 2.666 2.665 2.666s2.666-1.194 2.666-2.666c0-1.473-1.193-2.665-2.666-2.665v0h-11.403l-0.517-2.133h14.968l4.337-12.795zM13.107 27.196c0 0.882-0.717 1.599-1.599 1.599s-1.599-0.717-1.599-1.599c0-0.882 0.717-1.599 1.599-1.599s1.599 0.718 1.599 1.599zM24.836 27.196c0 0.882-0.718 1.599-1.6 1.599s-1.599-0.717-1.599-1.599c0-0.882 0.717-1.599 1.599-1.599 0.882 0 1.6 0.718 1.6 1.599zM11.058 21.331l-2.585-10.662h20.662l-3.615 10.662h-14.462z"
                fill="#000000"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
