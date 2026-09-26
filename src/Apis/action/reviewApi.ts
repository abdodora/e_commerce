'use server'

import { getAccessToken } from "@/utilities/getAccessToken";

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1';

// 1. Get Reviews For Product (Public)
export async function getProductReviews(productId: string) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
      method: 'GET',
      next: { revalidate: 60 }, // Cache revalidation
    });

    if (!response.ok) throw new Error('Failed to fetch reviews');

    const payload = await response.json();
    return payload;
  } catch (error) {
    throw new Error('Error fetching product reviews');
  }
}

// 2. Create Review For Product (Protected)
export async function createReview(productId: string, data: { review: string; rating: number }) {
  const token = await getAccessToken();

  // 1. التحقق من وجود التوكين
  if (!token) {
    throw new Error('UnAuthorized');
  }

  // 2. التحقق من وجود المعرف والبيانات المطلوب إرسالها
  else if (!productId || !data?.review || !data?.rating) {
    throw new Error('Invalid input data');
  }

  // 3. تنفيذ الطلب
  else {
    try {
      const response = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const payload = await response.json();

      // التحقق من حالة استجابة السيرفر باستخدام نفس الهيكلية
      if (response.ok) {
        return payload;
      } else if (payload?.message) {
        throw new Error(payload.message);
      } else {
        throw new Error('Failed to create review');
      }
    } catch (error: any) {
      throw new Error(error?.message || 'UnAuthorized or Invalid Data');
    }
  }
}

// 3. Update Review (Protected - Owner Only)
export async function updateReview(reviewId: string, data: { review?: string; rating?: number }) {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to update review');

    const payload = await response.json();
    return payload;
  } catch (error) {
    throw new Error('UnAuthorized or Action Failed');
  }
}






export async function deleteReview(reviewId: string) {
  const token = await getAccessToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
    {
      method: 'DELETE',
      headers: {
        token: token,
      },
    }
  );

  const text = await response.text();

  let payload: any = {};

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = {};
    }
  }

  if (!response.ok) {
    throw new Error(
      payload?.errors?.msg ||
      payload?.message ||
      `Delete failed with status ${response.status}`
    );
  }

  return payload;
}