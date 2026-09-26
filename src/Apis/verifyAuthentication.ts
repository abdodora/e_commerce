'use server'
import {
  ForgotPasswordPayload,
  
  
  ForgotPasswordResponse,
  VerifyResetCodePayload,
  VerifyResetCodeResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from '@/Apis/types/auth';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/auth';

export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
  const payload: ForgotPasswordPayload = { email };
  const res = await fetch(`${BASE_URL}/forgotPasswords`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data: ForgotPasswordResponse = await res.json();
  if (!res.ok) throw new Error(data.message || 'Email not found or error occurred');
  return data;
}

export async function verifyResetCode(resetCode: string): Promise<VerifyResetCodeResponse> {
  const payload: VerifyResetCodePayload = { resetCode };
  const res = await fetch(`${BASE_URL}/verifyResetCode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data: VerifyResetCodeResponse = await res.json();
  if (!res.ok) throw new Error(data.message || 'Invalid or expired code');
  return data;
}

export async function resetPassword(email: string, newPassword: string): Promise<ResetPasswordResponse> {
  const payload: ResetPasswordPayload = { email, newPassword };
  const res = await fetch(`${BASE_URL}/resetPassword`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data: ResetPasswordResponse = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to reset password');
  return data;
}




import { ChangePasswordPayload, ChangePasswordResponse } from '@/Apis/types/auth';
import { getAccessToken } from '@/utilities/getAccessToken';

const BASE_USERS_URL = 'https://ecommerce.routemisr.com/api/v1/users';

export async function changePassword(
  payload: ChangePasswordPayload
): Promise<ChangePasswordResponse> {
  const token=await getAccessToken()
console.log(token)
  const res = await fetch(`${BASE_USERS_URL}/changeMyPassword`, {
    method: 'PUT',
    headers: {
      token:token,
      'Content-Type': 'application/json',
      
      
    },
    body: JSON.stringify(payload),
  });

  const data: ChangePasswordResponse = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to change password');
  }

  return data;
}




