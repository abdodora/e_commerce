

import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

export async function getAccessToken() {
  const cookieStore = await cookies();
  
 
  const tokenValue =
    cookieStore.get('next-auth.session-token')?.value ||
    cookieStore.get('__Secure-next-auth.session-token')?.value;

  if (!tokenValue) return null;

  try {
    const decoded = await decode({
      token: tokenValue,
      secret: process.env.NEXTAUTH_SECRET!,
    });
 
     
    return (decoded as any)?.token || (decoded as any)?.user?.token || null;
  } catch (error) {
    return null;
  }
}


export async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();

  const tokenValue =
    cookieStore.get('next-auth.session-token')?.value ||
    cookieStore.get('__Secure-next-auth.session-token')?.value;

  if (!tokenValue) return null;

  try {
    const decoded = await decode({
      token: tokenValue,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    if (!decoded) return null;

    // استخراج الـ id المباشر من أوبجيكت الـ user بناءً على نتيجة السيشن
    const userId = (decoded as any)?.user?.id || (decoded as any)?.sub || null;

    return userId;
  } catch (error) {
    return null;
  }
}