'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  const bannerImages = [
    "https://img.lazcdn.com/g/tps/imgextra/i3/O1CN01wvw9i51Szh1uG1CkG_!!6000000002318-0-tps-1976-688.jpg",
    "https://img.lazcdn.com/g/tps/imgextra/i1/O1CN013nR2d31iazbK8MbTu_!!6000000004430-0-tps-1976-688.jpg_2200x2200q80.jpg_.avif",
  ];

  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="max-w-[1188px] mx-auto py-4 px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="rounded-lg"
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as Record<string, string>}
        >
          {bannerImages.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-[16/6]">
                <Image
                  src={banner}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
