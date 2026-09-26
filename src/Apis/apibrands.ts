
import { Brand,} from './types/productType';
export async function getBrands():Promise<Brand[]>{

try {
    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
   if (!response.ok) throw new Error('apierror')
const payload=await response.json()

  return payload.data
    console.log( payload.data)

} catch (error) {

    throw new Error('apierror')

    console.log(error)
}
}



export async function getSpecificBrand(prandid:string):Promise<Brand>{

try {
    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${prandid}`)
   if (!response.ok) throw new Error('apierror')
const payload=await response.json()

  return payload.data

} catch (error) {

    throw new Error('apierror')

    console.log(error)
}
}




export async function getProductsByBrand(brandId:string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, {
      next: { revalidate: 60 } // لإعادة جلب البيانات كل دقيقة (ISR في Next.js)
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await res.json();
    return data.data; // برجع مصفوفة المنتجات التابعة للبراند ده فقط
  } catch (error) {
    console.error('Error fetching products by brand:', error);
    return [];
  }
}