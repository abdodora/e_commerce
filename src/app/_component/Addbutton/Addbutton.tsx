'use client'

import { addToCart } from '@/Apis/action/cartAction'
import { toast } from '@/components/ui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react'

export default function addbutton({clas,text,prod}:{clas:string,text:ReactNode,prod:string}) {
  const query=useQueryClient()
async function handleAddCart() {

mutate(prod)


//  try {
//     const data = await addToCart(prod);

//     if (data.status === "success" || data.message === "Product added successfully to your cart") {
//       toast.add({
//         type: "success",
//         description: data.message,
//       });
//     } else {
//       toast.add({
//         type: "error",
//         description: 'Login first',
//       });
//     }
//   } catch (error) {
//     toast.add({
//       type: "error",
//       description: 'Login first',
//     });
//   }
}


const {data,mutate} =useMutation({
  mutationFn:addToCart,
  onSuccess:(data)=>{
      toast.add({
        type: "success",
        description: data.message,
      });
            query.invalidateQueries({queryKey:['GetCart']})

  },

  onError:()=>{
        toast.add({
      type: "error",
      description: 'Login first',
    });
  }
})

  return (
    
          <button onClick={handleAddCart}  className= {clas}>
            {text}
          </button>
  )
}
