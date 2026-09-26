// import { getAccessToken } from "@/utilities/getAccessToken";

// export async function GetCart() {
//   const token = await getAccessToken();

//   if (!token) throw new Error('UnAuthorized');

//   try {
//     const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
//       method: 'GET',
//       headers: {
//         token: token,
//         'Content-Type': 'application/json',
//       },
//       cache: 'no-store'
//     });

//     if (!response.ok) throw new Error('UnAuthorized');

//     const payload = await response.json();
//     console.log('cart', payload);
//     return payload;

//   } catch (error) {
//     throw new Error('UnAuthorized');
//   }
// }
