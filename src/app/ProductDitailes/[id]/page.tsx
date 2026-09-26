 

import { getSingleProduct } from '@/Apis/peoductApi';
import { getProductReviews } from '@/Apis/action/reviewApi'; // جلب الـ API الخاص بالتقييمات
import Image from 'next/image';
import React from 'react';
import Slider from './../../_component/Slider/page';
import Addbutton from './../../_component/Addbutton/Addbutton';
// import AddButtonToWishlist from './../../_component/AddbuttonToWish/AddbuttonToWish';
import Link from 'next/link';
import AddbuttonToWishlist from './../../_component/addbuttonToWish/AddbuttonToWish';
interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails(props: ProductDetailsProps) {
  const params = await props.params;
  const { id } = params;

 
  const [prod, reviewsRes] = await Promise.all([
    getSingleProduct(id),
    getProductReviews(id)
  ]);

  if (!prod) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }

  const hasDiscount = Boolean(prod.priceAfterDiscount);
  const discountPercentage = hasDiscount
? Math.round(
    ((prod.price - (prod.priceAfterDiscount ?? prod.price)) / prod.price) * 100
  )
    : 0;

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Main Product Details Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Product Images */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full bg-slate-100/70 rounded-2xl p-6 flex justify-center items-center overflow-hidden border border-slate-200/60 relative group">
                <Image 
                  width={400} 
                  height={400} 
                  src={prod.imageCover} 
                  alt={prod.title || "Product image"}
                  priority
                  className="object-contain max-h-[380px] w-auto transition-transform duration-500 group-hover:scale-105"
                />
                
                {hasDiscount && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                    -{discountPercentage}% OFF
                  </span>
                )}

                <AddbuttonToWishlist
                  clas="absolute top-2 right-2 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:bg-red-50 hover:text-red-500 hover:scale-110 active:scale-95 cursor-pointer z-10 group/btn"
                  prod={prod._id}
                  text={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 transition-colors group-hover/btn:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  }
                />
              </div>

              {prod.images && prod.images.length > 0 && (
                <div className="w-full mt-6">
                  <Slider spac={12} slidePreviw={3} imgList={prod.images} />
                </div>
              )}
            </div>

            {/* Right Column: Product Info & Actions */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="mb-4">
                {prod.category?.name && (
                  <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md mb-2">
                    {prod.category.name}
                  </span>
                )}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                  {prod.title}
                </h1>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className={`w-5 h-5 ${i < Math.floor(prod.ratingsAverage || 5) ? 'text-amber-400' : 'text-slate-200'}`}
                    >
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-800">{prod.ratingsAverage || '4.5'}</span>
                <span className="text-sm text-slate-400">({reviewsRes?.data?.length || 0} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 w-fit">
                {hasDiscount ? (
                  <>
                    <span className="text-3xl font-extrabold text-emerald-600">
                      ${prod.priceAfterDiscount}
                    </span>
                    <span className="text-lg text-slate-400 line-through">
                      ${prod.price}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold text-slate-900">
                    ${prod.price}
                  </span>
                )}
              </div>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 border-b border-slate-100 pb-6">
                {prod.description}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-8">
                <div className="flex-1">
                  <Addbutton
                    clas="w-full h-12 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    prod={prod._id}
                    text={
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <span>Add to Cart</span>
                      </>
                    }
                  />
                </div>

                <AddbuttonToWishlist
                  clas="h-12 px-6 rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 active:scale-[0.98] text-slate-700 hover:text-red-500 font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm group/btn cursor-pointer"
                  prod={prod._id}
                  text={
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 transition-colors group-hover/btn:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                      <span>Wishlist</span>
                    </>
                  }
                />
              </div>

            </div>
          </div>
        </div>



 
<Link 
  href={`/review/${prod._id}`}
  className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
>
  💬 Show & Add Reviews
</Link>
      </div>
    </div>
  );
}