import { ProductType } from './types/productType';
export async function getAllProduct():Promise<ProductType[]>{

try {
    const response=await fetch('https://ecommerce.routemisr.com/api/v1/products')
   if (!response.ok) throw new Error('apierror')
const payload=await response.json()

  return payload.data

} catch (error) {

    throw new Error('apierror')

    console.log(error)
}
}



export async function getSingleProduct(prodid:string):Promise<ProductType>{

try {
    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/products/${prodid}`)
   if (!response.ok) throw new Error('apierror')
const payload=await response.json()

  return payload.data

} catch (error) {

    throw new Error('apierror')

    console.log(error)
}
}


