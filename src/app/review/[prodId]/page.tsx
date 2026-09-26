import React from 'react';
import Reviews from './../../_component/reviews/Reviews';
 

interface ReviewsPageProps {
  params: Promise<{ prodId: string }>;
}

export default async function ProductReviewsPage(props: ReviewsPageProps) {
 console.log(props)
  const params = await props.params;
 console.log(params)

  const productId = params.prodId;

   return <Reviews productId={productId} />;
}