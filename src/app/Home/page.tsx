import { Button } from '@/components/ui/button'
import React, { lazy, Suspense } from 'react'
import Featurdproduct from '../../../src/app/_component/Featurdproduct/page'
import Slider from '../_component/Slider/page';
import img1 from '../../../src/assets-20260902T144900Z-1-001/assets/images/slider-image-1.jpeg'
import img2 from '../../../src/assets-20260902T144900Z-1-001/assets/images/slider-image-2.jpeg'

import img3 from '../../../src/assets-20260902T144900Z-1-001/assets/images/slider-image-3.jpeg'
// import ShopCategory from './_component/ShopCategory/page';
const  ShopCategory= lazy(()=> import('../_component/ShopCategory/page'));
export default function Home() {
  return (
  <>



<Slider spac={0} slidePreviw={1} imgList={[img1.src,img2.src,img3.src]}  >

</Slider>
<Suspense fallback={<div className='h-25 w-full flex justify-center items-center text-2xl'>loading....</div>}>
  <ShopCategory></ShopCategory>
</Suspense>
<Featurdproduct>

</Featurdproduct>

  </>
  );
}
