// 'use client'

// import Link from 'next/link'
// import React from 'react'
// import Addbutton from './../Addbutton/Addbutton'
// import { toast } from '@/components/ui/toast'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { deleteFromWishlist } from '@/Apis/action/washlistActin'
// import { Product, WishlistResponse } from '@/Apis/types/wishlistTypes'

// export default function WishListCom() {
//   const query = useQueryClient()

//   // 1. جلب بيانات الـ Wishlist
//   const { data:wishData, isLoading } = useQuery<WishlistResponse>({

//     queryKey: ['GetWishlist'],
//     queryFn: async () => {
//       const response = await fetch('/api/wishList')

//    const data = await response.json();
//     console.log('Wishlist Data from Client:', data);

//       if (!response.ok) throw new Error('Failed to fetch wishlist')
//       return response.json()
//     }
//   })
 
 

  
  

//   // 2. دالة حذف عنصر من الـ Wishlist
//   const { mutate: delItem, isPending: isRemoving } = useMutation({
//     mutationFn:deleteFromWishlist,
//     onSuccess: (deldata) => {
//       toast.add({
//         type: "success",
//         description: deldata.message || "Item removed successfully",
//       })
//       query.invalidateQueries({ queryKey: ['GetWishlist'] })
//     },
//     onError: () => {
//       toast.add({
//         type: "error",
//         description: 'Failed to remove item',
//       })
//     }
//   })

//   if (isLoading) {
//     return <div className="text-center py-10">Loading wishlist...</div>
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       {/* Header & Breadcrumbs */}
//       <div className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
//         <Link href="/Home" className="hover:underline hover:text-emerald-600 transition-colors">
//           Home
//         </Link>
//         <span>/</span>
//         <span className="text-gray-900 dark:text-gray-200 font-medium">Wishlist</span>
//       </div>

//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
//             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//           </svg>
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
//           <p className="text-xs text-gray-500">{wishData?.count} items saved</p>
//         </div>
//       </div>

//       {wishData?.count> 0 ? (
//         <>
//           {/* Desktop & Tablet Table */}
//           <div className="hidden md:block bg-white dark:bg-[#122B31] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-400 text-xs font-semibold uppercase">
//                   <th className="pb-4">Product</th>
//                   <th className="pb-4">Price</th>
//                   <th className="pb-4">Status</th>
//                   <th className="pb-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//                 {wishData?.data.map((item) => (
//                   <tr key={item._id} className="align-middle">
//                     <td className="py-4 flex items-center gap-4">
//                       <img 
//                         src={item.imageCover} 
//                         alt={item.title} 
//                         className="w-16 h-16 object-cover rounded-lg border border-gray-100 dark:border-gray-700 shrink-0" 
//                       />
//                       <div>
//                         <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm max-w-xs line-clamp-1">
//                           {item.title}
//                         </h3>
//                         <p className="text-xs text-gray-400 mt-0.5">{item.category?.name}</p>
//                       </div>
//                     </td>

//                     <td className="py-4 font-bold text-gray-900 dark:text-white text-sm">
//                       {item.price} EGP
//                     </td>

//                     <td className="py-4">
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
//                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
//                         In Stock
//                       </span>
//                     </td>

//                     <td className="py-4 text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         {/* زر إضافة للسلة */}
//                         <Addbutton
//                           clas="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs flex items-center gap-1.5 transition-colors"
//                           prod={item._id}
//                           text="Add to Cart"
//                         />

//                         {/* زر الحذف */}
//                         <button
//                           disabled={isRemoving}
//                           onClick={() => delItem(item._id)}
//                           className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors disabled:opacity-50"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//                           </svg>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile View - Cards */}
//           <div className="flex flex-col gap-4 md:hidden">
//             {wishData?.data.map((item) => (
//               <div key={item._id} className="bg-white dark:bg-[#122B31] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-3">
//                 <div className="flex gap-3">
//                   <img 
//                     src={item.imageCover} 
//                     alt={item.title} 
//                     className="w-16 h-16 object-cover rounded-lg border border-gray-100 dark:border-gray-700 shrink-0" 
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm line-clamp-2">
//                       {item.title}
//                     </h3>
//                     <p className="text-xs text-gray-400 mt-0.5">{item.category?.name}</p>
//                   </div>
//                 </div>

//                 <div className="text-xs space-y-1">
//                   <div className="flex items-center gap-1">
//                     <span className="text-gray-400">Price:</span>
//                     <span className="font-bold text-gray-900 dark:text-white">{item.price} EGP</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
//                   <Addbutton
//                     clas="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs flex items-center gap-1" 
//                     prod={item._id}
//                     text="Add to Cart"
//                   />

//                   <button
//                     disabled={isRemoving}
//                     onClick={() => delItem(item._id)}
//                     className="p-2 text-gray-400 hover:text-red-500 border border-gray-200 dark:border-gray-700 rounded-lg"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6">
//             <Link href="/Shop" className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-1 font-medium">
//               ← Continue Shopping
//             </Link>
//           </div>
//         </>
//       ) : (
//         /* Empty State */
//         <div className="bg-white dark:bg-[#122B31] rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Your wishlist is empty</h2>
//           <p className="text-xs text-gray-500 mb-6">Explore products and save your favorites here.</p>
//           <Link 
//             href="/Shop" 
//             className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold transition-colors inline-block"
//           >
//             Explore Products
//           </Link>
//         </div>
//       )}
//     </div>
//   )
// }



'use client'

import Link from 'next/link'
import React from 'react'
import Addbutton from './../Addbutton/Addbutton'
import { toast } from '@/components/ui/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteFromWishlist } from '@/Apis/action/washlistActin'
import { WishlistResponse } from '@/Apis/types/wishlistTypes'

export default function WishListCom() {
  const query = useQueryClient()

  // 1. جلب بيانات الـ Wishlist
  const { data: wishData, isLoading } = useQuery<WishlistResponse>({
    queryKey: ['GetWishlist'],
    queryFn: async () => {
      const response = await fetch('/api/wishList')

      if (!response.ok) throw new Error('Failed to fetch wishlist')

      const data = await response.json()
      console.log('Wishlist Data from Client:', data)

      return data 
    }
  })

  // 2. دالة حذف عنصر من الـ Wishlist
  const { mutate: delItem, isPending: isRemoving } = useMutation({
    mutationFn: deleteFromWishlist,
    onSuccess: (deldata) => {
      toast.add({
        type: "success",
        description: deldata.message || "Item removed successfully",
      })
      query.invalidateQueries({ queryKey: ['GetWishlist'] })
    },
    onError: () => {
      toast.add({
        type: "error",
        description: 'Failed to remove item',
      })
    }
  })

  if (isLoading) {
    return <div className="text-center py-10">Loading wishlist...</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header & Breadcrumbs */}
      <div className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
        <Link href="/Home" className="hover:underline hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-200 font-medium">Wishlist</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
          <p className="text-xs text-gray-500">{wishData?.count || 0} items saved</p>
        </div>
      </div>

      {wishData && wishData.count > 0 ? (
        <>
          {/* Desktop & Tablet Table */}
          <div className="hidden md:block bg-white dark:bg-[#122B31] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-400 text-xs font-semibold uppercase">
                  <th className="pb-4">Product</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {wishData.data.map((item) => (
                  <tr key={item._id} className="align-middle">
                    <td className="py-4 flex items-center gap-4">
                      <img 
                        src={item.imageCover} 
                        alt={item.title} 
                        className="w-16 h-16 object-cover rounded-lg border border-gray-100 dark:border-gray-700 shrink-0" 
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm max-w-xs line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">{item.category?.name}</p>
                      </div>
                    </td>

                    <td className="py-4 font-bold text-gray-900 dark:text-white text-sm">
                      {item.price} EGP
                    </td>

                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        In Stock
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Addbutton
                          clas="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                          prod={item._id}
                          text="Add to Cart"
                        />

                        <button
                          disabled={isRemoving}
                          onClick={() => delItem(item._id)}
                          className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View - Cards */}
          <div className="flex flex-col gap-4 md:hidden">
            {wishData.data.map((item) => (
              <div key={item._id} className="bg-white dark:bg-[#122B31] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-3">
                <div className="flex gap-3">
                  <img 
                    src={item.imageCover} 
                    alt={item.title} 
                    className="w-16 h-16 object-cover rounded-lg border border-gray-100 dark:border-gray-700 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.category?.name}</p>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Price:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{item.price} EGP</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                  <Addbutton
                    clas="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs flex items-center gap-1" 
                    prod={item._id}
                    text="Add to Cart"
                  />

                  <button
                    disabled={isRemoving}
                    onClick={() => delItem(item._id)}
                    className="p-2 text-gray-400 hover:text-red-500 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/Shop" className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-1 font-medium">
              ← Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-[#122B31] rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Your wishlist is empty</h2>
          <p className="text-xs text-gray-500 mb-6">Explore products and save your favorites here.</p>
          <Link 
            href="/Shop" 
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold transition-colors inline-block"
          >
            Explore Products
          </Link>
        </div>
      )}
    </div>
  )
}