import { getAllProduct } from '@/Apis/peoductApi'
import React from 'react'
import ProductCard from '../ProductCard/page';



export default async function page() {
     const data= await getAllProduct()
    //  console.log(data);
    
  return (
  <>
<div className='px-5'>
        <h2 className='text-2xl font-bold text-green-600 '>Featured Product</h2>
<div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 flex justify-center'>

  {data.map((product)=>{return<ProductCard product={product} key={product._id}/>})}
</div>
</div>
  </>
  )
}


// import React from 'react'
// import FadeLoader from './../../node_modules/react-spinners/FadeLoader';

// export default function loading() {
//     const color:string='#00A440'
//   return (
// <div className='h-screen bg-gray-200 flex justify-center items-center'>
//     <FadeLoader color={color}/>
// </div>
     
//   )
// }
