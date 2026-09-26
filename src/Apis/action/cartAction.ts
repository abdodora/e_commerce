
'use server'

import { getAccessToken } from "@/utilities/getAccessToken";

export async function addToCart(prodId: string) {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: 'POST',
      body: JSON.stringify({
        productId: prodId,
      }),
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('UnAuthorized');

    const payload = await response.json();
    console.log('cart', payload);
    return payload;

  } catch (error) {
    throw new Error('UnAuthorized');
  }
}



export async function deleteCart(prodId: string) {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${prodId}`, {
      method: 'DELETE',
      
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('UnAuthorized');

    const payload = await response.json();
    console.log('cart', payload);
    return payload;

  } catch (error) {
    throw new Error('UnAuthorized');
  }
}

export async function UpdateCartItem({prodId,count}:{prodId:string,count:number}) {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${prodId}`, {
      method: 'PUT',
            body: JSON.stringify({
        count:count,
      }),
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('UnAuthorized');

    const payload = await response.json();
    console.log('cart', payload);
    return payload;

  } catch (error) {
    throw new Error('UnAuthorized');
  }
}


export async function deleteAllCart() {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: 'DELETE',
 
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('UnAuthorized');

    const payload = await response.json();
    console.log('cart', payload);
    return payload;

  } catch (error) {
    throw new Error('UnAuthorized');
  }
}

 
export async function applyCouponAPI(couponCode: string) {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/applyCoupon`, {
      method: 'PUT',
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        couponName: couponCode,
      }),
    });
// تحويل الـ response لـ text الأول للتحقق من إنه JSON صحيح
    const rawText = await response.text();
    console.log('Raw Response from Server:', rawText);

    if (!rawText) {
      return { status: 'fail', message: 'Empty response from server' };
    }

    const payload = JSON.parse(rawText);
    return payload;

  } catch (error) {
    console.error('Catch Error Details:', error);
    return { status: 'fail', message: 'Failed to connect to coupon service' };
  }
}