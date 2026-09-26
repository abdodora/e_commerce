import React from 'react'
import { getAllProduct } from '@/Apis/peoductApi'
import ShopProduct from '../_component/shopProduct/ShopProduct'
import { ProductType } from './../../Apis/types/productType';


export default async function Shop() {

   const datap= await getAllProduct()
  return (
<section className="bg-gray-50 min-h-screen py-16 px-6">
  {/* Hero */}
  <div className="text-center mb-12">
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Explore Our Premium Gear</h1>
    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Top-rated tech and lifestyle essentials to power your day. Free shipping on all orders above $50.</p>
    <div className="mt-6">
      <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800">Shop Now</button>
    </div>
  </div>
  
 
  {/* Product Grid */}
 <ShopProduct  products={datap}/>
</section>

  )
}
