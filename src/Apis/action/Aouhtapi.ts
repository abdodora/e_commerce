
"use server";

import { cookies } from "next/headers";
import { userData } from "./../../app/(Auht)/Register/page";
import { loginData } from "@/app/(Auht)/Login/page";

export async function userRegister(data: userData) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const payload = await response.json();
console.log(payload);

    if (response.ok) {
 
return true
      
    
    }

  
  } catch (error) {
    console.log(error)
  }
}

// export async function userLogin(data: loginData) {
//   try {
//     const response = await fetch(
//       "https://ecommerce.routemisr.com/api/v1/auth/signin",
//       {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const payload = await response.json();
// console.log(payload)
//     if (response.ok) {
//       const cookie= await cookies()
//       cookie.set('userToken',payload.token,{
//         httpOnly:true,

        
//       })
//     }
// return response.ok
   
//   } catch (error) {
//    console.log(error);
   
//   }
// }

