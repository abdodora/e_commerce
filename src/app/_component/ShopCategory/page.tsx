import { getCategory } from '@/Apis/apiCategory';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default async function ShopCategory() {
 const dataaa = await getCategory();

  return (
    <div className="my-8 p-4">
      {/* عنوان القسم */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-green-600 pl-3">
        Shop By Category
      </h2>

      {/* شبكة العرض */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {dataaa?.map((cat) => (
          <Link 
            key={cat._id} 
            href={`/specificCategory/${cat._id}`}
            className="block group cursor-pointer"
          >
            <div className="flex flex-col items-center text-center bg-gray-100 rounded-2xl py-3 px-0 h-full">
              {/* صورة الـ Category */}
              <div className="relative w-24 h-24 mb-3 rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <Image 
                  className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  alt={cat.name} 
                  src={cat.image} 
                  fill 
                  sizes="(max-width: 768px) 130px, 150px"
                />
              </div>

              {/* اسم الـ Category */}
              <h4 className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-200 line-clamp-1">
                {cat.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}