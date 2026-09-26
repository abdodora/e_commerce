'use server'

import { getAccessToken } from "@/utilities/getAccessToken";

export async function getAllAdress() {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
      method: 'GET',
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('UnAuthorized');

    const payload = await response.json();
    console.log('ADRESS', payload);
    return payload;

  } catch (error) {
    throw new Error('UnAuthorized');
  }
}

export async function removeAdress(adressId: string) {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${adressId}`, {
      method: 'DELETE',
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('UnAuthorized');

    const payload = await response.json();
    console.log('ADRESS', payload);
    return payload;

  } catch (error) {
    throw new Error('UnAuthorized');
  }
}

export async function addAdress(formData: any) {
  const token = await getAccessToken();

  if (!token) throw new Error('UnAuthorized');

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
      method: 'POST',
      body: JSON.stringify(formData),  
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('UnAuthorized');

    const payload = await response.json();
    console.log('ADRESS', payload);
    return payload;

  } catch (error) {
    throw new Error('UnAuthorized');
  }
}