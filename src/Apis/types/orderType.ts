export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface UserOrder {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
}

export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  ratingsQuantity?: number;
  category?: Category;
  subcategory?: Subcategory[];
}

export interface OrderCartItem {
  _id: string;
  count: number;
  price?: number; // لو موجود من الـ API
  product: OrderProduct;
}

export interface Order {
  _id: string;
  id?: number | string;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string; // 'cash' | 'card'
  isPaid: boolean;
  isDelivered: boolean;
  user: UserOrder;
  cartItems: OrderCartItem[];
  createdAt?: string;
}