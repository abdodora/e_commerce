import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategory } from '@/Apis/apiCategory';

export default async function CategoryPage() {
  // جلب كافة الأقسام من الـ API
  const categories = await getCategory();

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title & Breadcrumb */}
        <div className="mb-8">
          <nav className="text-sm text-gray-500 mb-2 font-medium">
            <Link href="/Home" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-semibold">Categories</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories?.map((cat: any) => (
            <Link
              key={cat._id}
              href={`/specificCategory/${cat._id}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative w-full h-64 p-4 flex items-center justify-center bg-gray-50/50 group-hover:bg-slate-100/50 transition-colors">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>

              {/* Category Name Banner */}
              <div className="p-4 bg-white border-t border-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-gray-800 text-lg group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h2>
                <span className="text-xs text-emerald-600 font-medium group-hover:translate-x-1 transition-transform">
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}