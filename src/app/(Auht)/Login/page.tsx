 
"use client"

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { toast } from "@/components/ui/toast"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useRouter } from 'next/navigation'
import { loginSchema } from './../../../schema/loginSchema'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export type loginData = zod.infer<typeof loginSchema>

export default function Page() {
  const router = useRouter()

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<loginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema)
  })

  async function submitForm(data: loginData) {
    const islogin = await signIn('credentials', { ...data, redirect: false })

    if (islogin?.ok) {
      toast.add({
        title: "Welcome back!",
        description: "Logged in successfully.",
      })
      router.push('/')
    } else {
      toast.add({
        title: "Authentication Failed",
        description: "Invalid email or password. Please try again.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200 text-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all border border-gray-100">
        
        {/* Form Container */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 md:p-12 flex flex-col justify-center">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Welcome Back 
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Please enter your details to sign in to your account.
            </p>
          </div>

          {/* Social Sign In */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              type="button" 
              onClick={() => signIn('google')}
              className="w-full font-semibold shadow-sm rounded-xl py-2.5 px-4 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-all duration-200 active:scale-[0.98]"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
                <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
              </svg>
              <span className="text-sm">Google</span>
            </button>

            <button 
              type="button" 
              onClick={() => signIn('github')}
              className="w-full font-semibold shadow-sm rounded-xl py-2.5 px-4 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-all duration-200 active:scale-[0.98]"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 32 32">
                <path fillRule="evenodd" d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
              </svg>
              <span className="text-sm">GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 relative flex items-center justify-center">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-3 text-xs uppercase tracking-wider text-gray-400 absolute font-medium">
              Or with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Email Address</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="mt-1 h-11 rounded-xl bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between items-center">
                    <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Password</FieldLabel>
                    <Link href='/forgetPassword' className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    {...field}
                    id={field.name}
                    type='password'
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="mt-1 h-11 rounded-xl bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Button 
              type='submit' 
              disabled={isSubmitting}
              className='w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mt-2'
            >
              {isSubmitting ? "Signing in..." : "Login Now"}
            </Button>
          </form>

          {/* Footer Navigation */}
          <p className="mt-8 text-xs text-gray-500 text-center">
            Don't have an account?{' '}
            <Link href="/Register" className="text-emerald-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

{/* Right Illustration Side */}
<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 items-center justify-center p-8 relative overflow-hidden">
  
  {/* الإضاءة الخلفية الناعمة لتوزيع الألوان */}
  <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

  {/* حاوية الصورة الفخمة مع البوردر المتناسق */}
  <div className="relative z-10 w-full h-full min-h-[460px] rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/20 group flex flex-col justify-end">
    
    {/* صورة تسوق 3D مبهجة وفخمة بلون زمردي مريح */}
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
      style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1200&auto=format&fit=crop")' 
      }}
    />
    
    {/* طبقة التدرج اللوني التي تدمج الصورة مع النص والألوان العامة */}
    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-slate-950/40 to-transparent" />

    {/* المحتوى النصي الفخم */}
    <div className="relative z-20 p-8 text-white">
      <div className="inline-block px-3 py-1 bg-emerald-500/20 backdrop-blur-md rounded-full text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
        ShopMart Store
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
        Premium Shopping Experience
      </h3>
      <p className="text-sm text-emerald-100/80 mt-2 leading-relaxed">
        Discover millions of products at your fingertips with seamless checkout.
      </p>
    </div>

  </div>
</div>

      </div>
    </div>
  )
}