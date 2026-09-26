

'use server'

import { ship } from "@/app/checkOut/CheckOutForm";
import { getAccessToken } from "@/utilities/getAccessToken";

export async function AddCashOrder(cartId: string ,shippingAddress:ship) {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
      method: 'POST',
      body: JSON.stringify({
        shippingAddress:shippingAddress
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

 

export async function AddOnlineOrder(cartId: string ,shippingAddress:ship) {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        shippingAddress:shippingAddress
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