import { Category } from './types/productType';

export async function getCategory(): Promise<Category[]> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
    if (!response.ok) throw new Error('apierror');
    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getSingleCategory(prodid: string): Promise<Category | null> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${prodid}`);
    if (!response.ok) throw new Error('apierror');
    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.log(error);
    return null; // أو تقدر تعمل throw error حسب طريقة استخدامك ليها
  }
}

export async function getProductsByCategory(brandId: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${brandId}`);

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