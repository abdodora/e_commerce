'use client'

import { addToWishlist } from '@/Apis/action/washlistActin';
import { toast } from '@/components/ui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react'

export default function AddbuttonToWishlist({ clas, text, prod }: { clas: string, text: ReactNode, prod: string }) {
  const query = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (data) => {
      toast.add({
        type: "success",
        description: data.message || "Added to wishlist successfully",
      });
      query.invalidateQueries({ queryKey: ['GetWishlist'] });
    },
    // 👈 استقبال الـ error القادم من الـ action
    onError: (error: Error) => {
      console.error("Wishlist Error:", error);
      toast.add({
        type: "error",
        description: error.message || 'Something went wrong', // هتعرض الرسالة الحقيقية للخطأ
      });
    }
  });

  return (
    <button onClick={() => mutate(prod)} className={clas}>
      {text}
    </button>
  );
}