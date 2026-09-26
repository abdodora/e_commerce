
import Link from 'next/link'
import React from 'react'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full space-y-6">
        
        {/* الأيقونة الخضراء المميزة */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-500 border-4 border-emerald-500/20">
            <svg
              className="w-10 h-10 stroke-[2.5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* العناوين والرسالة */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Order Placed!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Thank you for your order. We'll deliver it as soon as possible!
          </p>
        </div>

        {/* أزرار التوجيه */}
        <div className="space-y-3 pt-2">
          {/* زر التوجيه إلى طلباتي */}
          <Link
            href="/orders" // أو المسار الخاص بصفحة الطلبات عندك
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span>View My Orders</span>
          </Link>

          {/* زر المتابعة في التسوق */}
          <Link
            href="/Shop"
            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center text-sm"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  )
}



