// 'use client'
// import { deleteAllCart, deleteCart, UpdateCartItem } from '@/Apis/action/cartAction'
// import { CartRespons } from '@/Apis/types/cartTypes'
// import { toast } from '@/components/ui/toast'
// import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query'
// import React from 'react'
// import  Link  from 'next/link';

// export default function CartComp() {

// const query=useQueryClient()




// const {data:cartData,isLoading} =useQuery<CartRespons>({
//     queryKey:['GetCart'],
//     queryFn: async()=>{
//         const response=await fetch('/api/cart')
//         if(!response.ok)throw new Error('faild to fetch')

//             return response.json()
//     }
// })


// // delete

// const {data:deldata, mutate:delItem}=
// useMutation({
//   mutationFn:deleteCart,
//     onSuccess:(deldata)=>{
//       toast.add({
//         type: "success",
//         description:deldata.message,
//       })
//       console.log(deldata)
//       query.invalidateQueries({queryKey:['GetCart']})
// },
//   onError:()=>{
//         toast.add({
//       type: "error",
//       description: 'no remove Item',
//     });
//   }
// })



// // update
// const{data:updated,mutate:update}=useMutation({
//   mutationFn:UpdateCartItem,
//     onSuccess:( updated)=>{
//       toast.add({
//         type: "success",
//         description:  updated.message,
//       })
//       console.log(deldata)
//       query.invalidateQueries({queryKey:['GetCart']})
// },
//   onError:()=>{
//         toast.add({
//       type: "error",
//       description: 'no remove Item',
//     });
//   }
// })

// function handleUpdate (prodId:string,count:number){

//   update({prodId,count})
// }


// // deleteAll

// const {data:deleted, mutate:delcart}=
// useMutation({
//   mutationFn:deleteAllCart,
//     onSuccess:(deleted)=>{
//       toast.add({
//         type: "success",
//         description:deleted.message,
//       })
//       console.log(deldata)
//       query.invalidateQueries({queryKey:['GetCart']})
// },
//   onError:()=>{
//         toast.add({
//       type: "error",
//       description: 'no remove Item',
//     });
//   }
// })



// if(isLoading){
//   return <h2>loading......</h2>
// }
// console.log(cartData);












//   return (
//      <>
//      {cartData?.numOfCartItems?<section className="w-full bg-white dark:bg-[#0A2025] py-9 px-8">
//   <h1 className="text-center text-[#191919] dark:text-white text-[32px] font-semibold leading-[38px]">
//     My Shopping Cart
//   </h1>
//   <div className="flex items-start mt-8 gap-6">
//     <div className="bg-white p-4 w-[800px] rounded-xl">
//       <table className="w-full bg-white rounded-xl">
//         <thead>
//           <tr className="text-center border-b border-gray-400 w-full text-[#7f7f7f] text-sm font-medium uppercase leading-[14px] tracking-wide">
//             <th className="text-left px-2 py-2">Product</th>
//             <th className="px-2 py-2">price</th>
//             <th className="px-2 py-2">Quantity</th>
//             <th className="px-2 py-2">Subtotal</th>
//             <th className="w-7 px-2 py-2" />
//           </tr>
//         </thead>
//         <tbody>
//             {cartData?.data.products.map((prodct)=>          <tr key={prodct._id} className="text-center">
//             <td className="px-2 py-2 text-left align-top">
//               <img src= {prodct.product.imageCover} alt="test" className="w-[100px] mr-2 inline-block h-[100px]" /><span>Green Capsicum</span>
//             </td>
//             <td className="px-2 py-2">{prodct.price} EGP</td>
//             <td className="p-2 mt-9 bg-white rounded-[170px] border border-[#a0a0a0] justify-around items-center flex">
//               <svg onClick={()=>{handleUpdate(prodct.product._id, prodct.count-1)}}   width={14} height={15} className="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path   d="M2.33398 7.5H11.6673" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg><span className="w-10 text-center text-[#191919] text-base font-normal leading-normal">{prodct.count}</span><svg  onClick={()=>{handleUpdate(prodct.product._id, prodct.count+1)}}  className="cursor-pointer relative" width={14} height={15} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path   d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </td>
//             <td className="px-2 py-2">{prodct.price *prodct.count}EGP</td>
//             <td className="px-2 py-2">
//               <svg onClick={()=>{delItem(prodct.product._id)}} width={24} className="cursor-pointer" height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="#CCCCCC" strokeMiterlimit={10} />
//                 <path d="M16 8.5L8 16.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M16 16.5L8 8.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </td>
//           </tr>)}

 
//         </tbody>
//         <tfoot>
//           <tr className="border-t border-gray-400">
//             <td className="px-2 py-2" colSpan={3}>
//                <Link href='/Home'>              <button className="px-8 cursor-pointer py-3.5 bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-sm font-semibold className leading-[16px]">
//  Return to shop              </button>
// </Link>
//             </td>
//             <td className="px-2 py-2" colSpan={2}>
//               <button  onClick={()=>{delcart()}}  className="px-8 py-3.5 cursor-pointer bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-sm font-semibold className leading-[16px]">
//                 Delete Cart
//               </button>
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//     <div className="w-[424px] bg-white rounded-lg p-6">
//       <h2 className="text-[#191919] mb-2 text-xl font-medium leading-[30px]">
//         Cart Total
//       </h2>
//       <div className="w-[376px] py-3 justify-between items-center flex">
//         <span className="text-[#4c4c4c] text-base font-normal leading-normal">Total:</span><span className="text-[#191919] text-base font-semibold leading-tight">{cartData?.data.totalCartPrice} EGP</span>
//       </div>
//       <div className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
//         <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Shipping:</span><span className="text-[#191919] text-sm font-medium leading-[21px]">Free</span>
//       </div>
//       <div className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
//         <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">numbeROfCartItem</span><span className="text-[#191919] text-sm font-medium leading-[21px]">{cartData?.numOfCartItems}</span>
//       </div>
//       <button className="w-[376px] text-white mt-5 px-10 py-4 bg-[#00b206] rounded-[44px] gap-4 text-base font-semibold leading-tight">
//         Proceed to checkout
//       </button>
//     </div>
//   </div>
//   <div className="mt-6 p-5 w-[800px] bg-white rounded-lg border border-[#e6e6e6] justify-start items-center gap-6 inline-flex">
//     <h3 className="text-[#191919] w-1/4 text-xl font-medium className leading-[30px]">
//       Coupon Code
//     </h3>
//     <div className="w-full border border-[#e6e6e6]">
//       <input placeholder="Enter code" type="text" className="w-2/3 px-6 py-3.5 outline-none bg-white rounded-[46px] text-[#999999] text-base font-normal leading-normal" /><button className="px-10 py-4 bg-[#333333] rounded-[43px] text-white text-base font-semibold leading-tight">
//         Apply Coupon
//       </button>
//     </div>
//   </div>
// </section> :<h2 className='text-center py-5 text-5xl'>Cart Empty</h2>}


//      </>
//   )
// }




'use client'
import { deleteAllCart, deleteCart, UpdateCartItem,applyCouponAPI } from '@/Apis/action/cartAction'
import { CartRespons } from '@/Apis/types/cartTypes'
import { toast } from '@/components/ui/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useRef } from 'react'
import Link from 'next/link';


export default function CartComp() {


const couponRef = useRef<HTMLInputElement>(null);
  const query = useQueryClient();

  const { mutate: applyCoupon, isPending } = useMutation({
    mutationFn: applyCouponAPI,
    onSuccess: (data) => {
      if (data?.status === 'success') {
        toast.add({
          type: "success",
          description: "Coupon applied successfully",
        });
        if (couponRef.current) couponRef.current.value = '';
        query.invalidateQueries({ queryKey: ['GetCart'] });
      } else {
        toast.add({
          type: "error",
          description:  "Invalid coupon code",
        });
      }
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Failed to apply coupon",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const couponValue = couponRef.current?.value.trim();

    if (!couponValue) {
      toast.add({
        type: "error",
        description: "Please enter a coupon code",
      });
      return;
    }

    applyCoupon(couponValue);
  };



 
  const { data: cartData, isLoading } = useQuery<CartRespons>({
    queryKey: ['GetCart'],
    queryFn: async () => {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('failed to fetch')
      return response.json()
    }
  })

  // Delete Item
  const { mutate: delItem } = useMutation({
    mutationFn: deleteCart,
    onSuccess: (deldata) => {
      toast.add({
        type: "success",
        description: deldata.message,
      })
      query.invalidateQueries({ queryKey: ['GetCart'] })
    },
    onError: () => {
      toast.add({
        type: "error",
        description: 'Failed to remove item',
      });
    }
  })

  // Update Quantity
  const { mutate: update } = useMutation({
    mutationFn: UpdateCartItem,
    onSuccess: (updated) => {
      toast.add({
        type: "success",
        description: updated.message,
      })
      query.invalidateQueries({ queryKey: ['GetCart'] })
    },
    onError: () => {
      toast.add({
        type: "error",
        description: 'Failed to update item',
      });
    }
  })



  function handleUpdate(prodId: string, count: number) {
    if (count <= 0) {
      delItem(prodId)
    } else {
      update({ prodId, count })
    }
  }


  

  // Delete All Cart
  const {data:deleted, mutate: delcart } = useMutation({
    mutationFn: deleteAllCart,
    onSuccess: (deleted) => {
      toast.add({
        type: "success",
        description: deleted.message,
      })
      query.invalidateQueries({ queryKey: ['GetCart'] })
    },
    onError: () => {
      toast.add({
        type: "error",
        description: 'Failed to clear cart',
      });
    }
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <h2 className="text-xl font-semibold animate-pulse text-gray-600 dark:text-gray-300">Loading your cart...</h2>
      </div>
    )
  }

  return (
    <>
      {cartData?.numOfCartItems ? (
        <section className="w-full bg-slate-50 dark:bg-[#0A2025] py-6 sm:py-9 px-4 sm:px-8 transition-colors duration-300">
          <h1 className="text-center text-[#191919] dark:text-white text-2xl sm:text-[32px] font-semibold leading-tight">
            My Shopping Cart
          </h1>

          <div className="flex flex-col lg:flex-row items-start mt-6 sm:mt-8 gap-6 max-w-7xl mx-auto">
            
            {/* Left Side: Cart Items Table/Cards */}
            <div className="w-full lg:w-[68%] flex flex-col gap-4">
              
              {/* Desktop Table View (Hidden on mobile) */}
              <div className="bg-white dark:bg-[#122B31] p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-x-auto hidden md:block">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-[#7f7f7f] dark:text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wide">
                      <th className="pb-4">Product</th>
                      <th className="pb-4 text-center">Price</th>
                      <th className="pb-4 text-center">Quantity</th>
                      <th className="pb-4 text-center">Subtotal</th>
                      <th className="pb-4 text-right" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {cartData?.data.products.map((prodct) => (
                      <tr key={prodct._id} className="text-center group">
                        <td className="py-4 text-left align-middle flex items-center gap-3">
                          <img 
                            src={prodct.product.imageCover} 
                            alt={prodct.product.title || "Product"} 
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-100 dark:border-gray-700 shrink-0" 
                          />
                          <span className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base line-clamp-2">
                            {prodct.product.title || "Green Capsicum"}
                          </span>
                        </td>
                        <td className="py-4 align-middle font-medium text-gray-700 dark:text-gray-300">
                          {prodct.price} EGP
                        </td>
                        <td className="py-4 align-middle">
                          <div className="mx-auto w-28 px-3 py-1.5 bg-gray-50 dark:bg-[#0A2025] rounded-full border border-gray-300 dark:border-gray-600 flex justify-between items-center">
                            <button 
                              onClick={() => handleUpdate(prodct.product._id, prodct.count - 1)}
                              className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                              <svg width={14} height={15} viewBox="0 0 14 15" fill="none">
                                <path d="M2.33398 7.5H11.6673" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <span className="text-sm font-semibold text-gray-800 dark:text-white">{prodct.count}</span>
                            <button 
                              onClick={() => handleUpdate(prodct.product._id, prodct.count + 1)}
                              className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                              <svg width={14} height={15} viewBox="0 0 14 15" fill="none">
                                <path d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="py-4 align-middle font-semibold text-emerald-600 dark:text-emerald-400">
                          {prodct.price * prodct.count} EGP
                        </td>
                        <td className="py-4 align-middle text-right">
                          <button 
                            onClick={() => delItem(prodct.product._id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg width={22} height={23} viewBox="0 0 24 25" fill="none">
                              <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="currentColor" strokeMiterlimit={10} />
                              <path d="M16 8.5L8 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M16 16.5L8 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Mobile Layout (Shown only on small screens) */}
              <div className="flex flex-col gap-3 md:hidden">
                {cartData?.data.products.map((prodct) => (
                  <div key={prodct._id} className="bg-white dark:bg-[#122B31] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={prodct.product.imageCover} 
                        alt="Product" 
                        className="w-16 h-16 object-cover rounded-lg border border-gray-100 dark:border-gray-700 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {prodct.product.title || "Product Title"}
                        </h4>
                        <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-1">
                          {prodct.price} EGP
                        </p>
                      </div>
                      <button 
                        onClick={() => delItem(prodct.product._id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg width={22} height={23} viewBox="0 0 24 25" fill="none">
                          <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="currentColor" strokeMiterlimit={10} />
                          <path d="M16 8.5L8 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16 16.5L8 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800 pt-3">
                      <div className="px-3 py-1 bg-gray-50 dark:bg-[#0A2025] rounded-full border border-gray-200 dark:border-gray-700 flex items-center gap-4">
                        <button onClick={() => handleUpdate(prodct.product._id, prodct.count - 1)}>
                          -
                        </button>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">{prodct.count}</span>
                        <button onClick={() => handleUpdate(prodct.product._id, prodct.count + 1)}>
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">Subtotal</span>
                        <span className="font-bold text-gray-900 dark:text-white text-base">
                          {prodct.price * prodct.count} EGP
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons Footer */}
              <div className="bg-white dark:bg-[#122B31] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
                <Link href='/Home' className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-full transition-colors">
                    Return to shop
                  </button>
                </Link>
                <button 
                  onClick={() => delcart()} 
                  className="w-full sm:w-auto px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-full transition-colors"
                >
                  Clear Cart
                </button>
              </div>

{/* Coupon Code Section */}
    <div className="bg-white dark:bg-[#122B31] p-4 sm:p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center gap-4">
      <h3 className="text-gray-900 dark:text-white text-base font-medium whitespace-nowrap">
        Coupon Code
      </h3>
      <form 
        onSubmit={handleSubmit}
        className="w-full flex flex-col sm:flex-row gap-2 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-full p-1.5 focus-within:border-emerald-500 transition-colors"
      >
        <input 
          ref={couponRef}
          placeholder="Enter coupon code" 
          type="text" 
          disabled={isPending}
          className="w-full px-4 py-2 bg-transparent outline-none text-gray-800 dark:text-white text-sm placeholder:text-gray-400 disabled:opacity-50" 
        />
        <button 
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-700 disabled:bg-gray-400 text-white rounded-xl sm:rounded-full text-sm font-semibold transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isPending ? 'Applying...' : 'Apply Coupon'}
        </button>
      </form>
    </div>

            </div>

            {/* Right Side: Cart Summary Card */}
            <div className="w-full lg:w-[32%] bg-white dark:bg-[#122B31] rounded-2xl p-5 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm sticky top-6">
              <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">
                Cart Total
              </h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500 dark:text-gray-400">Total Price:</span>
                  <span className="text-gray-900 dark:text-white font-bold text-base">{cartData?.data.totalCartPrice} EGP</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400">Shipping:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Free</span>
                </div>

                <div className="flex justify-between items-center py-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400">Total Items:</span>
                  <span className="text-gray-900 dark:text-white font-semibold">{cartData?.numOfCartItems}</span>
                </div>
              </div>
<Link href={`/checkOut/${cartData.cartId}`}>
              <button className="w-full text-white mt-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition-all rounded-full text-base font-semibold shadow-md shadow-emerald-600/20">
                Proceed to checkout
              </button></Link>
            </div>

          </div>
        </section>
      ) : (
        <div className="min-h-[400px] flex flex-col justify-center items-center gap-4 px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 dark:text-white">Your Cart is Empty</h2>
          <p className="text-gray-500 text-sm">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/Home">
            <button className="mt-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </>
  )
}