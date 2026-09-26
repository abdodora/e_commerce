'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { forgotPassword, verifyResetCode, resetPassword } from '@/Apis/verifyAuthentication';
import { Step1FormInput, Step2FormInput, Step3FormInput } from '@/Apis/types/auth';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<number>(1);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const router = useRouter();

  // Forms لكل مرحلة مع الـ Types الخاصة بها
  const formStep1 = useForm<Step1FormInput>();
  const formStep2 = useForm<Step2FormInput>();
  const formStep3 = useForm<Step3FormInput>();

  // Handlers
  const handleStep1: SubmitHandler<Step1FormInput> = async (data) => {
    setLoading(true);
    setErrorMsg('');
    try {
      await forgotPassword(data.email);
      setUserEmail(data.email);
      setStep(2);
    } catch (err) {
      if (err instanceof Error) setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStep2: SubmitHandler<Step2FormInput> = async (data) => {
    setLoading(true);
    setErrorMsg('');
    try {
      await verifyResetCode(data.resetCode);
      setStep(3);
    } catch (err) {
      if (err instanceof Error) setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStep3: SubmitHandler<Step3FormInput> = async (data) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await resetPassword(userEmail, data.newPassword);
      if (res.token) {
        router.push('/Login');
      }
    } catch (err) {
      if (err instanceof Error) setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Indicators for Steps */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className={`h-2.5 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-green-600' : 'w-2.5 bg-gray-200'}`} />
          <span className={`h-2.5 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-green-600' : 'w-2.5 bg-gray-200'}`} />
          <span className={`h-2.5 rounded-full transition-all duration-300 ${step === 3 ? 'w-8 bg-green-600' : 'w-2.5 bg-gray-200'}`} />
        </div>

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* ================= STEP 1: Email ================= */}
        {step === 1 && (
          <form onSubmit={formStep1.handleSubmit(handleStep1)} className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
              <p className="text-xs text-gray-500 mt-1">No worries! Enter your email to receive a reset code.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                {...formStep1.register('email', { required: 'Email is required' })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-green-600 text-sm transition-colors"
              />
              {formStep1.formState.errors.email && (
                <span className="text-xs text-red-500 mt-1 block">{formStep1.formState.errors.email.message}</span>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending Code...' : 'Send Reset Code'}
            </button>
          </form>
        )}

        {/* ================= STEP 2: OTP Verification ================= */}
        {step === 2 && (
          <form onSubmit={formStep2.handleSubmit(handleStep2)} className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Verify Reset Code</h2>
              <p className="text-xs text-gray-500 mt-1">We sent a verification code to <span className="font-semibold text-gray-700">{userEmail}</span></p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Reset Code (OTP)</label>
              <input
                type="text"
                placeholder="Enter reset code"
                {...formStep2.register('resetCode', { required: 'Code is required' })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-green-600 text-sm transition-colors text-center font-mono tracking-widest"
              />
              {formStep2.formState.errors.resetCode && (
                <span className="text-xs text-red-500 mt-1 block">{formStep2.formState.errors.resetCode.message}</span>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
        )}

        {/* ================= STEP 3: New Password ================= */}
        {step === 3 && (
          <form onSubmit={formStep3.handleSubmit(handleStep3)} className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Set New Password</h2>
              <p className="text-xs text-gray-500 mt-1">Your new password must be different from previous passwords.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
<input
  type="password"
  placeholder="••••••••"
  {...formStep3.register('newPassword', {
    required: 'Password is required',
    minLength: { value: 6, message: 'Must be at least 6 characters' },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[0-9])/,
      message: 'Password must contain at least one uppercase letter and one number',
    },
  })}
  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-green-600 text-sm transition-colors"
/>
              {formStep3.formState.errors.newPassword && (
                <span className="text-xs text-red-500 mt-1 block">{formStep3.formState.errors.newPassword.message}</span>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}

      </div>
    </section>
  );
}