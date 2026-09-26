'use client';

import React, { useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import {
  getProductReviews,
  createReview,
  deleteReview,
} from '@/Apis/action/reviewApi';
import {
  ReviewsResponse,
  MutationResponse,
} from '@/Apis/types/reviewType';
import Link from 'next/link';

import { toast } from '@/components/ui/toast';

interface ReviewsContentProps {
  productId: string;
}

export default function ReviewsContent({
  productId,
}: ReviewsContentProps) {
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const ratingRef = useRef<HTMLSelectElement>(null);

  const query = useQueryClient();

  // المستخدم الحالي
  const { data: session } = useSession();

  const currentUserId = session?.user?.id;
  // ⚠️ لازم تتأكد إن الـ role موجود فعليًا في الـ session بنفس الاسم ده
  const isAdmin = (session?.user as any)?.role === 'admin';

  // 1. جلب التقييمات
  const { data: reviewsData, isLoading } = useQuery<ReviewsResponse>({
    queryKey: ['GetReviews', productId],
    queryFn: () => getProductReviews(productId),
    enabled: Boolean(productId),
  });

  // 2. إضافة تقييم
  const { mutate: addReview, isPending: isAdding } = useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: {
        review: string;
        rating: number;
      };
    }) => createReview(productId, data),

    onSuccess: (data) => {
      if (data?.status === 'success' || data?.data) {
        toast.add({
          type: 'success',
          description: 'Review added successfully',
        });

        if (reviewRef.current) {
          reviewRef.current.value = '';
        }

        query.invalidateQueries({
          queryKey: ['GetReviews', productId],
        });
      } else if (data?.message) {
        toast.add({
          type: 'error',
          description: data.message,
        });
      } else {
        toast.add({
          type: 'error',
          description: 'Failed to add review',
        });
   
      }
    },

    onError: (error: any) => {
      toast.add({
        type: 'error',
        description: error?.message || 'Failed to add review',
      });
    },
  });

  // 3. حذف تقييم
  const {
    mutate: delReview,
    isPending: isDeleting,
    variables: deletingReviewId, // بنستخدمه عشان نعرف مين بالظبط اللي بيتمسح
  } = useMutation<MutationResponse, Error, string>({
    mutationFn: deleteReview,

    onSuccess: () => {
      toast.add({
        type: 'success',
        description: 'Review removed successfully',
      });
 
    },

    onError: (error) => {
      toast.add({
        type: 'error',
        description: error.message || 'Failed to remove review',
      });
 
    },

    onSettled: async () => {
      await query.invalidateQueries({
        queryKey: ['GetReviews', productId],
      });
    },
  });

  // 4. إرسال التقييم
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const commentValue = reviewRef.current?.value.trim();
    const ratingValue = Number(ratingRef.current?.value || 5);

    if (!commentValue) {
      toast.add({
        type: 'error',
        description: 'Please enter a review comment',
      });
    } else if (ratingValue < 1 || ratingValue > 5) {
      toast.add({
        type: 'error',
        description: 'Please select a valid rating between 1 and 5',
      });
    } else {
      addReview({
        productId,
        data: {
          review: commentValue,
          rating: ratingValue,
        },
      });
    }
  };

  const reviewsList = reviewsData?.data || [];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">

        <Link
          href={`/ProductDitailes/${productId}`}
          className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          ← Back to Product
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">

          <h1 className="text-2xl font-bold text-slate-900 mb-6">
            Product Reviews (
            {reviewsData?.results || reviewsList.length}
            )
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200/60"
          >
            <h3 className="text-md font-semibold text-slate-800 mb-3">
              Leave a Review
            </h3>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Rating
              </label>

              <select
                ref={ratingRef}
                defaultValue="5"
                className="w-full md:w-48 p-2.5 border border-slate-300 rounded-xl bg-white text-slate-800 text-sm focus:outline-none"
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Terrible</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Comment
              </label>

              <textarea
                ref={reviewRef}
                rows={3}
                placeholder="Write your opinion about this product..."
                className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-800 text-sm focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isAdding}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              {isAdding ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>

          {/* Loading */}
          {isLoading && (
            <p className="text-slate-500 text-sm text-center py-6">
              Loading reviews...
            </p>
          )}

          {/* No Reviews */}
          {!isLoading && reviewsList.length === 0 && (
            <p className="text-slate-400 text-sm text-center py-6">
              No reviews yet for this product.
            </p>
          )}

          {/* Reviews List */}
          {!isLoading && reviewsList.length > 0 && (
            <div className="space-y-4">
              {reviewsList.map((item) => {
                const canDelete =
                  item.user?._id === currentUserId || isAdmin;
                const isThisDeleting =
                  isDeleting && deletingReviewId === item._id;

                return (
                  <div
                    key={item._id}
                    className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-start"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-slate-800 text-sm">
                          {item.user?.name || 'User'}
                        </span>

                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-bold">
                          ⭐ {item.rating}
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm">
                        {item.review}
                      </p>
                    </div>

                    {/* Delete يظهر لصاحب الريفيو أو للأدمن */}
                    {canDelete && (
                      <button
                        onClick={() => delReview(item._id)}
                        disabled={isDeleting}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold p-1 cursor-pointer disabled:opacity-50"
                      >
                        {isThisDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}