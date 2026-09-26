'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { changePassword } from '@/Apis/verifyAuthentication';
import { ChangePasswordPayload } from '@/Apis/types/auth';

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordPayload>();

  // لمقارنة كلمة السر الجديدة بتأكيد كلمة السر
  const newPasswordValue = watch('password');

  const onSubmit: SubmitHandler<ChangePasswordPayload> = async (data) => {
    // التأكد من وجود الـ Token في السيشن
    // const token = (session as any)?.token || (session as any)?.user?.token;

    // if (!token) {
    //   setErrorMsg('Unauthorized! Please login again.');
    //   return;
    // }


    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await changePassword(data);
      if (res.message || res.token) {
        setSuccessMsg('Password updated successfully!');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
          <p className="text-xs text-gray-500 mt-1">
            Please enter your current password and a new password.
          </p>
        </div>

        {/* Dynamic Alerts */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-xl border border-green-100 text-center font-medium">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('currentPassword', {
                required: 'Current password is required',
              })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-green-600 text-sm transition-colors"
            />
            {errors.currentPassword && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              New Password
            </label>
<input
  type="password"
  placeholder="••••••••"
  {...register('password', {
    required: 'New password is required',
    minLength: { value: 6, message: 'Must be at least 6 characters' },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[0-9])/,
      message: 'Password must contain at least one uppercase letter and one number',
    },
  })}
  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-green-600 text-sm transition-colors"
/>
            {errors.password && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('rePassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === newPasswordValue || 'Passwords do not match',
              })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-green-600 text-sm transition-colors"
            />
            {errors.rePassword && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.rePassword.message}
              </span>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl text-sm transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>
    </section>
  );
}