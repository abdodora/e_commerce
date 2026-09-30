// 'use client'

// import { AddCashOrder, AddOnlineOrder } from '@/Apis/action/CheckOutAction'
// import { Button } from '@/components/ui/button'
// import { Field, FieldError, FieldLabel } from '@/components/ui/field'
// import { Input } from '@/components/ui/input'
// import { toast } from '@/components/ui/toast'
// import { useQuery } from '@tanstack/react-query'
// import React, { useState } from 'react'
// import { Controller, useForm } from 'react-hook-form'
// import { CartRespons } from './../../Apis/types/cartTypes';
// import { useRouter } from 'next/navigation';

// export interface ship {
//   details: string
//   phone: string
//   city: string
//   postalcode?: string
// }

// export default function CheckOutForm({ cartId }: { cartId: string }) {
//   const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash')
//   const [isSubmitting, setIsSubmitting] = useState(false)


//   const router = useRouter()  
//   // 1. استخدام الـ Interface المستورد مباشرة
//   const { data: cartResponse, isLoading } = useQuery<CartRespons>({
//     queryKey: ['GetCart'],
//     queryFn: async () => {
//       const response = await fetch('/api/cart')
//       if (!response.ok) throw new Error('failed to fetch cart')
//       return response.json()
//     }
//   })

//   const cartData = cartResponse?.data

//   const { handleSubmit, control } = useForm<ship>({
//     defaultValues: {
//       details: '',
//       phone: '',
//       city: '',
//       postalcode: ''
//     }
//   })

//   async function submitForm(data: ship) {
//     setIsSubmitting(true)
//     try {
//       if (paymentMethod === 'cash') {
//         const payload = await AddCashOrder(cartId, data)
//         if (payload?.status === 'success') {
//           toast.add({
//             type: 'success',
//             description: 'Order created successfully',
//           })
//          router.push('/success-order')
//         } else {
//           toast.add({
//             type: 'error',
//             description: payload?.message || 'Failed to create order',
//           })
//         }
//       } else {
//         const payload = await AddOnlineOrder(cartId, data)
//         if (payload?.status === 'success' && payload?.session?.url) {
//           window.location.href = payload.session.url
//         } else {
//           toast.add({
//             type: 'error',
//             description: payload?.message || 'Failed to process online payment',
//           })
//         }
//       }
//     } catch (error: any) {
//       toast.add({
//         type: 'error',
//         description: error?.message || 'Something went wrong',
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="max-w-6xl mx-auto my-10 px-4">
//       <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Checkout</h1>

//       <form onSubmit={handleSubmit(submitForm)}>
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
//           {/* الجانب الأيسر: الشحن وطريقة الدفع */}
//           <div className="lg:col-span-7 space-y-6">
            
//             {/* Shipping Address */}
//             <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
//               <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white font-semibold text-lg">
//                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 <h2>Shipping Address</h2>
//               </div>

//               <div className="flex flex-col gap-4">
//                 <Controller
//                   name="details"
//                   control={control}
//                   rules={{ required: 'Address details are required' }}
//                   render={({ field, fieldState }) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Address Details
//                       </FieldLabel>
//                       <Input
//                         {...field}
//                         id={field.name}
//                         aria-invalid={fieldState.invalid}
//                         placeholder="Enter your address details"
//                         className="mt-1 rounded-xl"
//                       />
//                       {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//                     </Field>
//                   )}
//                 />

//                 <Controller
//                   name="phone"
//                   control={control}
//                   rules={{ required: 'Phone number is required' }}
//                   render={({ field, fieldState }) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Phone Number
//                       </FieldLabel>
//                       <Input
//                         {...field}
//                         id={field.name}
//                         type="tel"
//                         aria-invalid={fieldState.invalid}
//                         placeholder="01xxxxxxxxx"
//                         className="mt-1 rounded-xl"
//                       />
//                       {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//                     </Field>
//                   )}
//                 />

//                 <Controller
//                   name="city"
//                   control={control}
//                   rules={{ required: 'City is required' }}
//                   render={({ field, fieldState }) => (
//                     <Field data-invalid={fieldState.invalid}>
//                       <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                         City
//                       </FieldLabel>
//                       <Input
//                         {...field}
//                         id={field.name}
//                         type="text"
//                         aria-invalid={fieldState.invalid}
//                         placeholder="Enter your city"
//                         className="mt-1 rounded-xl"
//                       />
//                       {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//                     </Field>
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h2>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setPaymentMethod('cash')}
//                   className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all ${
//                     paymentMethod === 'cash'
//                       ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600'
//                       : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 text-gray-600 dark:text-gray-400'
//                   }`}
//                 >
//                   <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                   <span className="text-sm font-medium">Cash on Delivery</span>
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setPaymentMethod('online')}
//                   className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all ${
//                     paymentMethod === 'online'
//                       ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600'
//                       : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 text-gray-600 dark:text-gray-400'
//                   }`}
//                 >
//                   <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                   <span className="text-sm font-medium">Online Payment</span>
//                 </button>
//               </div>
//             </div>

// <Button
//   type="submit"
//   disabled={isSubmitting}
//   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-200 text-base flex items-center justify-center gap-2"
// >
//   {isSubmitting ? (
//     <>
//       {/* Spinner Icon عند التحميل */}
//       <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//       </svg>
//       <span>
//         {paymentMethod === 'online' ? 'Redirecting to Payment...' : 'Creating Order...'}
//       </span>
//     </>
//   ) : (
//     <>
//       {paymentMethod === 'online' ? (
//         <>
//           <span>Proceed to Payment</span>
//           {/* أيقونة السهم للدفع أونلاين لتوضيح الانتقال لصفحة أونلاين */}
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//           </svg>
//         </>
//       ) : (
//         <>
//           <span>Confirm Cash Order</span>
//           {/* أيقونة التثبيت للطلب الكاش */}
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//           </svg>
//         </>
//       )}
//     </>
//   )}
// </Button>
//           </div>

//           {/* الجانب الأيمن: Order Summary */}
//           <div className="lg:col-span-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm sticky top-6">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

//             {isLoading ? (
//               <div className="py-8 text-center text-sm text-gray-400">Loading order summary...</div>
//             ) : (
//               <>
//                 <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-1">
//                   {cartData?.products && cartData.products.length > 0 ? (
//                     cartData.products.map((item: any) => (
//                       <div key={item._id} className="flex items-center justify-between gap-3">
//                         <div className="flex items-center gap-3 min-w-0">
//                           <div className="relative shrink-0">
//                             <img
//                               src={item.product?.imageCover}
//                               alt={item.product?.title}
//                               className="w-14 h-14 object-cover rounded-xl border border-gray-100 dark:border-gray-800"
//                             />
//                             <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                               {item.count}
//                             </span>
//                           </div>
//                           <div className="min-w-0">
//                             <h3 className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate max-w-[170px]">
//                               {item.product?.title}
//                             </h3>
//                             <p className="text-xs text-gray-400 mt-0.5">EGP {item.price}</p>
//                           </div>
//                         </div>

//                         <span className="text-xs font-bold text-gray-900 dark:text-white shrink-0">
//                           EGP {(item.price * item.count).toLocaleString()}
//                         </span>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-xs text-gray-400 text-center py-4">No items in cart</p>
//                   )}
//                 </div>

//                 <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4 mb-4">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
//                     <span className="font-semibold text-gray-900 dark:text-white">
//                       EGP {cartData?.totalCartPrice?.toLocaleString() || 0}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-gray-600 dark:text-gray-400">Shipping</span>
//                     <span className="text-emerald-600 font-medium">Free</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between text-base font-bold text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-800 pt-4">
//                   <span>Total</span>
//                   <span>EGP {cartData?.totalCartPrice?.toLocaleString() || 0}</span>
//                 </div>
//               </>
//             )}
//           </div>

//         </div>
//       </form>
//     </div>
//   )
// }


'use client'

import { getAllAdress } from '@/Apis/action/AdressAction'
import { AddCashOrder, AddOnlineOrder } from '@/Apis/action/CheckOutAction'
// import { Adress } from '@/components/Adresscom'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { useQuery ,useQueryClient} from '@tanstack/react-query'
import { Check, MapPin, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CartRespons } from './../../Apis/types/cartTypes'


export interface ship {
  details: string
  phone: string
  city: string
  postalcode?: string
}
export interface Adress {
  _id?: string
  id?: string
  name: string
  details: string
  phone: string
  city: string
}
export default function CheckOutForm({ cartId }: { cartId: string }) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // حالة لمعرفة العنوان المختار حالياً
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [isNewAddress, setIsNewAddress] = useState(false)

  const router = useRouter()
  const query = useQueryClient();
  // 1. جلب بيانات السلة
  const { data: cartResponse, isLoading: isCartLoading } = useQuery<CartRespons>({
    queryKey: ['GetCart'],
    queryFn: async () => {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('failed to fetch cart')
      return response.json()
    },
  })

  // 2. جلب العناوين المسجلة للمستخدم
  const { data: addressData, isLoading: isAddressesLoading } = useQuery({
    queryKey: ['getUserAdress'],
    queryFn: async () => await getAllAdress(),
  })

  const savedAddresses: Adress[] = addressData?.data || []
  const cartData = cartResponse?.data

  const { handleSubmit, control, setValue, reset } = useForm<ship>({
    defaultValues: {
      details: '',
      phone: '',
      city: '',
      postalcode: '',
    },
  })

  // دالة عند اختيار عنوان مسجل مسبقاً
  const handleSelectSavedAddress = (address: Adress) => {
    const addressId = address._id || address.id || ''
    setSelectedAddressId(addressId)
    setIsNewAddress(false)

    // ملء مدخلات الفورم تلقائياً
    setValue('details', address.details || '', { shouldValidate: true })
    setValue('phone', address.phone || '', { shouldValidate: true })
    setValue('city', address.city || '', { shouldValidate: true })
  }

  // دالة عند اختيار إدخال عنوان جديد يدوياً
  const handleSelectNewAddress = () => {
    setSelectedAddressId(null)
    setIsNewAddress(true)
    reset({
      details: '',
      phone: '',
      city: '',
      postalcode: '',
    })
  }

  async function submitForm(data: ship) {
    setIsSubmitting(true)
    try {
      if (paymentMethod === 'cash') {
        const payload = await AddCashOrder(cartId, data)
        if (payload?.status === 'success') {
          toast.add({
            type: 'success',
            description: 'Order created successfully',
          })
          router.push('/success-order')
          query.invalidateQueries({ queryKey: ['GetCart'] });
        } else {
          toast.add({
            type: 'error',
            description: payload?.message || 'Failed to create order',
          })
        }
      } else {
        const payload = await AddOnlineOrder(cartId, data)
        console.log(payload)
        if (payload?.status === 'success' && payload?.session?.url) {
          window.location.href = payload.session.url
                    query.invalidateQueries({ queryKey: ['GetCart'] });

        } else {
          toast.add({
            type: 'error',
            description: payload?.message || 'Failed to process online payment',
          })
        }
      }
    } catch (error: any) {
      toast.add({
        type: 'error',
        description: error?.message || 'Something went wrong',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Checkout</h1>

      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* الجانب الأيسر: الشحن وطريقة الدفع */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Shipping Address Section */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold text-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h2>Shipping Address</h2>
              </div>

              {/* قسم إتاحة اختيار العناوين المسجلة */}
              {isAddressesLoading ? (
                <p className="text-sm text-gray-400">Loading saved addresses...</p>
              ) : (
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Saved Addresses
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* طباعة العناوين المسجلة */}
                    {savedAddresses.map((address) => {
                      const addressId = address._id || address.id || ''
                      const isSelected = selectedAddressId === addressId && !isNewAddress

                      return (
                        <div
                          key={addressId}
                          onClick={() => handleSelectSavedAddress(address)}
                          className={`cursor-pointer p-4 rounded-xl border transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                              : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>

                          <div className="min-w-0 space-y-1">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block truncate">
                              {address.name || 'Saved Address'}
                            </span>
                            <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
                              {address.details}, {address.city}
                            </p>
                            <p className="text-[11px] text-gray-400">📞 {address.phone}</p>
                          </div>
                        </div>
                      )
                    })}

                    {/* خيار إدخال عنوان جديد */}
                    <div
                      onClick={handleSelectNewAddress}
                      className={`cursor-pointer p-4 rounded-xl border border-dashed transition-all flex items-center gap-3 ${
                        isNewAddress
                          ? 'border-blue-600 bg-blue-50/30 dark:bg-blue-950/20'
                          : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 shrink-0">
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        Use a new address
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* حقول المدخلات Form Inputs */}
              <div className="flex flex-col gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                <Controller
                  name="details"
                  control={control}
                  rules={{ required: 'Address details are required' }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Address Details
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your address details"
                        className="mt-1 rounded-xl"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: 'Phone number is required' }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone Number
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="tel"
                        aria-invalid={fieldState.invalid}
                        placeholder="01xxxxxxxxx"
                        className="mt-1 rounded-xl"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="city"
                  control={control}
                  rules={{ required: 'City is required' }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        City
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your city"
                        className="mt-1 rounded-xl"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium">Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('online')}
                  className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all ${
                    paymentMethod === 'online'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">Online Payment</span>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-200 text-base flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>
                    {paymentMethod === 'online' ? 'Redirecting to Payment...' : 'Creating Order...'}
                  </span>
                </>
              ) : (
                <>
                  {paymentMethod === 'online' ? (
                    <>
                      <span>Proceed to Payment</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Confirm Cash Order</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </>
              )}
            </Button>
          </div>

          {/* الجانب الأيمن: Order Summary */}
          <div className="lg:col-span-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

            {isCartLoading ? (
              <div className="py-8 text-center text-sm text-gray-400">Loading order summary...</div>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-1">
                  {cartData?.products && cartData.products.length > 0 ? (
                    cartData.products.map((item: any) => (
                      <div key={item._id} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative shrink-0">
                            <img
                              src={item.product?.imageCover}
                              alt={item.product?.title}
                              className="w-14 h-14 object-cover rounded-xl border border-gray-100 dark:border-gray-800"
                            />
                            <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                              {item.count}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate max-w-[170px]">
                              {item.product?.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">EGP {item.price}</p>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-gray-900 dark:text-white shrink-0">
                          EGP {(item.price * item.count).toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-4">No items in cart</p>
                  )}
                </div>

                <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      EGP {cartData?.totalCartPrice?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-base font-bold text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-800 pt-4">
                  <span>Total</span>
                  <span>EGP {cartData?.totalCartPrice?.toLocaleString() || 0}</span>
                </div>
              </>
            )}
          </div>

        </div>
      </form>
    </div>
  )
}