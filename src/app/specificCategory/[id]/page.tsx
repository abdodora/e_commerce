import React from 'react';
import Link from 'next/link';
import { X, SlidersHorizontal, PackageX } from 'lucide-react';
import Image from 'next/image';
import ProductCard from '@/app/_component/ProductCard/page';
import { getProductsByCategory, getSingleCategory } from '@/Apis/apiCategory';
type Props = {
  params: {
    id: string
  }
}
export default async function Page(props:Props) {
  const params = await props.params;
  const categoryId = params.id;
  
  // جلب بيانات القسم والمنتجات
  const category = await getSingleCategory(categoryId);
  const products = await getProductsByCategory(categoryId);

  // التحقق من وجود منتجات
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <section className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm opacity-90 mb-4 font-medium">
            <Link href="/Home" className="hover:underline">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/Category" className="hover:underline">Categories</Link>
            <span className="mx-1">/</span>
            <span className="font-semibold text-white">{category?.name}</span>
          </nav>

          <div className="flex items-center gap-4">
            {category?.image && (
              <div className="bg-white p-2 rounded-2xl w-14 h-14 flex items-center justify-center shadow-sm">
                <Image 
                  height={300} 
                  width={300} 
                  src={category.image} 
                  alt={category.name || 'Category'} 
                  className="max-h-10 max-w-full object-contain rounded-xl" 
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{category?.name}</h1>
              <p className="text-sm text-emerald-100 mt-1">Explore {category?.name} products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar & Product Count */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 font-medium text-gray-700">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Active Filters:</span>
            </div>
            <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
              <span>{category?.name}</span>
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-purple-900" />
            </div>
            <button className="text-gray-400 hover:text-gray-600 text-xs underline">
              Clear all
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Showing {hasProducts ? products.length : 0} products
        </p>

        {/* عرض المنتجات أو واجهة عدم وجود منتجات */}
        {hasProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-center my-8">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <PackageX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-500 text-sm max-w-md mb-6">
              There are currently no products available in <span className="font-semibold text-gray-700">{category?.name}</span>.
            </p>
            <Link
              href="/Category"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
            >
              Browse Other Categories
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}