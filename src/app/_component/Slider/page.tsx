'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// استيراد الستايل الأساسي فقط (بدون الستايل الافتراضي للأزرار لكي لا يحدث تضارب)
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';

interface SliderProps {
  spac: number;
  slidePreviw: number;
  imgList: string[];
}

export default function Slider({ spac, slidePreviw, imgList }: SliderProps) {
  return (
    <div className="relative w-full max-w-[1800px] mx-auto group">
      
      {/* 1. السلايدر الرئيسي */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        // ربط أزرار التنقل بالكلاسات المخصصة بالأسفل
        navigation={{
          nextEl: '.custom-next-btn',
          prevEl: '.custom-prev-btn',
        }}
        // ربط النقاط بكلاس مخصص
        pagination={{ 
          clickable: true,
          el: '.custom-pagination'
        }}
          autoplay={{
          delay: 3000, // الوقت بين كل صورة والثانية (3000 مللي ثانية = 3 ثوانٍ)
          disableOnInteraction: false, // يستمر في العمل تلقائياً حتى لو ضغط المستخدم على الأزرار
          pauseOnMouseEnter: true, // يوقف الحركة مؤقتاً إذا وضع المستخدم مؤشر الماوس فوق السلايدر للقراءة
        }}
        spaceBetween={spac}
        slidesPerView={slidePreviw}
        className="w-full h-[400px] rounded-xl overflow-hidden"
      >
        {imgList.map((src, index) => (
          <SwiperSlide key={index}> 
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 1800px"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 2. أزرار التنقل المخصصة (Next & Prev) - يمكنك تعديل الـ CSS هنا مباشرة */}
      <button className="custom-prev-btn absolute left-4 top-1/2  z-10 bg-white/80 hover:bg-white text-green-600 p-3 rounded-full shadow-lg transition-all group-hover:opacity-100">
        {/* سهم الخلف (Prev) - يمكنك وضع أي أيقونة أو نص هنا */}
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button className="custom-next-btn absolute right-4 top-1/2  z-10 bg-white/80 hover:bg-white text-green-600 p-3 rounded-full shadow-lg transition-all   group-hover:opacity-100">
        {/* سهم الأمام (Next) */}
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* 3. نقاط الترقيم المخصصة (Pagination) */}
     <div className="custom-pagination" />

    </div>
  );
}
