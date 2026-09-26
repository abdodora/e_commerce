// import React from 'react'
// import { ProductType } from '../../../Apis/types/productType';
// import Image from 'next/image';
// import Link from "next/link";
// import Addbutton from './../Addbutton/Addbutton';
// import AddbuttonToWishlist from '../addbuttonToWish/AddbuttonToWish';


 
// export default function ProductCard({product}:{product:ProductType}) {
 
//   return<div>
//   <div className="m-3">

//     <div className=" border border-blue-200 rounded-lg shadow-md p-4">
//       {/* Discount Badge */}
//       <div className="relative">
//         <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
//           -20%
//         </span>
//         {/* Wishlist Icon */}
 
// <AddbuttonToWishlist 
//   clas="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
//   prod={product._id}
//   text={
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//       <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
//     </svg>
//   }
// />
//         {/* Product Image */}
//         <div>
//          <Link href={`/ProductDitailes/${product._id}`}>
//           <Image width={300} height={300} src={product.imageCover} alt={product.title} className="object-contain w-full h-[270px] " />
//           </Link>
//         </div> 
//       </div>
//       {/* Product Details */}
//       <div className="mt-4">
//         <h3 className="text-gray-800 font-medium text-base line-clamp-1">
//  {product.title}
//         </h3>
//         <p className="uppercase text-green-600 text-xs font-medium">
//         {product.category.name}
//         </p>
//         {/* Ratings */}
//         <div className="flex space-x-1 text-orange-500 text-sm mt-1">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
//           </svg>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
//           </svg>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
//           </svg>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
//           </svg>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
//           </svg>
//           <span>{product.ratingsAverage}</span>
//         </div>
//         {/* Pricing */}
//         <div className="flex items-end justify-between">
//           <div className="flex items-baseline space-x-2 mt-2">
//             {product.priceAfterDiscount?<>
//             <span className="text-blue-600 text-xl font-semibold">{product.priceAfterDiscount}</span>
//             <span className="text-gray-400 text-sm line-through">{product.price}</span></>: <span className="text-gray-400 text-sm line-through">{product.price}</span>}
//           </div>
// <Addbutton
//   clas="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow text-white" 
//   prod={product._id}
//   text={(
//     <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart">
//       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//       <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
//       <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
//       <path d="M17 17h-11v-14h-2" />
//       <path d="M6 5l14 1l-1 7h-13" />
//     </svg>
//   )}
// />        </div>
//       </div>
//     </div>
//   </div>
// </div>

// }

import React from 'react'
import { ProductType } from '../../../Apis/types/productType';
import Image from 'next/image';
import Link from "next/link";
import Addbutton from './../Addbutton/Addbutton';
import AddbuttonToWishlist from '../addbuttonToWish/AddbuttonToWish';

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="m-3">
      {/* الكارت الرئيسي مع إضافة transition و overflow-hidden */}
      <div className="group relative bg-white border border-gray-100 hover:border-blue-300 rounded-2xl shadow-sm hover:shadow-xl p-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5">
        
        {/* Discount Badge */}
        {product.priceAfterDiscount && (
          <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm animate-pulse">
            -20%
          </span>
        )}

        {/* Wishlist Icon مع تأثير hover */}
        <div className="z-10 relative">
          <AddbuttonToWishlist
            clas="absolute top-2 right-2 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:bg-red-50 hover:text-red-500 hover:scale-110 active:scale-95 cursor-pointer"
            prod={product._id}
            text={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 transition-colors group-hover/btn:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            }
          />
        </div>

        {/* Product Image Wrapper */}
        <div className="overflow-hidden rounded-xl bg-gray-50/50 p-2">
          <Link href={`/ProductDitailes/${product._id}`} className="block overflow-hidden">
            <Image
              width={300}
              height={300}
              src={product.imageCover}
              alt={product.title}
              className="object-contain w-full h-[250px] transition-transform duration-500 ease-out group-hover:scale-108 group-hover:rotate-1"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="mt-4 space-y-2">
          <p className="uppercase text-blue-600 text-[11px] font-bold tracking-wider">
            {product.category.name}
          </p>

          <h3 className="text-gray-800 font-semibold text-base line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
            {product.title}
          </h3>

          {/* Ratings */}
          <div className="flex items-center space-x-1 rtl:space-x-reverse text-amber-400 text-xs">
            <div className="flex text-amber-400">
              {[...Array(4)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
                </svg>
              ))}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-300 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
              </svg>
            </div>
            <span className="text-gray-500 font-medium text-xs ms-1">({product.ratingsAverage})</span>
          </div>

          {/* Pricing & Add to Cart */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
              {product.priceAfterDiscount ? (
                <>
                  <span className="text-blue-600 text-lg font-bold">EGP {product.priceAfterDiscount}</span>
                  <span className="text-gray-400 text-xs line-through">EGP {product.price}</span>
                </>
              ) : (
                <span className="text-gray-900 text-lg font-bold">EGP {product.price}</span>
              )}
            </div>

            <Addbutton
              clas="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-md hover:shadow-lg text-white transition-all duration-300 hover:scale-110 active:scale-95"
              prod={product._id}
              text={(
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-12">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              )}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
