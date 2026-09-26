'use server'

import { getAccessToken } from "@/utilities/getAccessToken" // عدل المسار حسب مكان الفايل عندك
import { getUserId } from "@/utilities/getAccessToken"             // عدل المسار حسب مكان الفايل عندك

export async function getUserOrders() {
  // 1. جلب Token و User ID في السيرفر
  const token = await getAccessToken()
  const userId = await getUserId()

  // التأكد من وجود البيانات
  if (!token || !userId) {
    throw new Error('غير مصرح لك بالوصول، يرجي تسجيل الدخول أولاً.')
  }

  try {
    // 2. طلب الأوردرات بالـ ID المباشر الخاص باليوزر
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
      method: 'GET',
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 } // لضمان جلب أحدث الأوردرات دائماً
    })

    if (!response.ok) {
      throw new Error('فشل في جلب طلبات المستخدم')
    }

    const payload = await response.json()
    return payload
  } catch (error: any) {
    throw new Error(error?.message || 'حدث خطأ غير متوقع أثناء جلب الطلبات')
  }
}