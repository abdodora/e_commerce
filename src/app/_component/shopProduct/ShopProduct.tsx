"use client"

import React, { useState } from 'react'
import { ProductType } from '@/Apis/types/productType'
import ProductCard from '../ProductCard/page'



export default function ShopProduct({ products }: { products: ProductType[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // قائمة الفئات المتاحة
  const categories = ['All', "Men's Fashion", "Women's Fashion", 'SuperMarket', 'Electronics']
const productList = Array.isArray(products) ? products : [];
  // تصفية المنتجات بناءً على الفئة المحددة
 const filteredProducts = selectedCategory === 'All'
  ? productList
  : productList.filter((product) => 
      product.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
    );
 


  return (
    <div className="px-5">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

    

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  )
}