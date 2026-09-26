
'use server'

import { getAccessToken } from "@/utilities/getAccessToken";

export async function addToWishlist(prodId: string) {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
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



export async function deleteFromWishlist(prodId: string) {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`, {
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
