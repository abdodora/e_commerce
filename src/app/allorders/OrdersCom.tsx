'use client'

import { getUserOrders } from '@/Apis/action/getAllOrders'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { Order } from '../../Apis/types/orderType';

export default function OrdersList() {
  const { data: orders, isLoading, isError, error } = useQuery<Order[]>({
    queryKey: ['getUserOrders'],
    queryFn: async () => await  getUserOrders(),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-12 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30">
        <p className="text-red-600 font-medium text-sm">
          {(error as Error)?.message || 'حدث خطأ أثناء تحميل الطلبات'}
        </p>
      </div>
    )
  }

  const ordersList = Array.isArray(orders) ? orders : (orders as any)?.data || []

  if (ordersList.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/40 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No orders found</h3>
        <p className="text-gray-500 text-sm mb-6">Looks like you haven't placed any orders yet.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors text-sm"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {ordersList.map((order: Order) => (
        <div
          key={order._id}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-6 overflow-hidden"
        >
          {/* Order Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div>
              <span className="text-xs text-gray-400 block mb-1">Order ID</span>
              <span className="font-semibold text-gray-900 dark:text-white text-sm">#{order._id}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Payment Method */}
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 capitalize">
                {order.paymentMethodType === 'card' ? '💳 Online Card' : '💵 Cash on Delivery'}
              </span>

              {/* Payment Status */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.isPaid
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40'
                    : 'bg-amber-50 text-amber-600 dark:bg-amber-950/40'
                }`}
              >
                {order.isPaid ? 'Paid' : 'Unpaid'}
              </span>

              {/* Delivery Status */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.isDelivered
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40'
                    : 'bg-purple-50 text-purple-600 dark:bg-purple-950/40'
                }`}
              >
                {order.isDelivered ? 'Delivered' : 'In Transit'}
              </span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="space-y-4">
            {order.cartItems?.map((item) => (
              <div key={item._id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50">
                    <img
                      src={item.product?.imageCover}
                      alt={item.product?.title || 'Product'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs md:max-w-md">
                      {item.product?.title}
                    </h4>
                    {item.product?.subcategory?.[0]?.name && (
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        {item.product.subcategory[0].name}
                      </span>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Quantity: <span className="font-semibold text-gray-700 dark:text-gray-300">{item.count}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address Details */}
          {order.shippingAddress && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl text-xs space-y-1 text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-1">
                📍 Shipping Info:
              </span>
              <p><strong className="font-medium">City:</strong> {order.shippingAddress.city}</p>
              <p><strong className="font-medium">Details:</strong> {order.shippingAddress.details}</p>
              <p><strong className="font-medium">Phone:</strong> {order.shippingAddress.phone}</p>
            </div>
          )}

          {/* Order Footer - Total Price */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 text-sm">
            <span className="text-gray-500 font-medium">Total Order Price</span>
            <span className="text-lg font-bold text-blue-600">
              EGP {order.totalOrderPrice?.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}