
import React from 'react'
import OrdersCom from './OrdersCom'
export default function AllOrdersPage() {
  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track your recent orders</p>
        </div>
      </div>

      {/* استدعاء مكون العرض */}
      <OrdersCom/>
    </div>
  )
}