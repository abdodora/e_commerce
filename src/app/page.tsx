// import Link from "next/link";
// import Image from "next/image";
// import logo from "./../assets-20260902T144900Z-1-001/assets/images/freshcart-logo.svg"; // تأكد من مسار اللوجو لديك

// export default function HomeLayout() {
//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      
//       {/* Hero Section */}
//       <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
//         <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full mb-3">
//           Hi foud
//         </span>
        
//         <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
//           Welcome to <span className="text-green-600">FreshCart</span>
//         </h1>
        
//         <p className="max-w-2xl text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
//           Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with
//           fast shipping and excellent customer service.
//         </p>

//         {/* Call to Action Buttons */}
//         <div className="flex items-center gap-4 mt-8">
//           <Link
//             href="/Shop"
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
//           >
//             Shop Now
//           </Link>

//           <Link
//             href="/Category"
//             className="border border-gray-300 hover:border-green-600 hover:text-green-700 text-gray-700 font-semibold px-6 py-2.5 rounded-lg transition-colors bg-white"
//           >
//             Browse Categories
//           </Link>
//         </div>
//       </section>

//       {/* Footer Section */}
//       <footer className="border-t border-gray-100 bg-gray-50/50 pt-12 pb-8">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
          
//           {/* Brand Info */}
//           <div className="md:col-span-1 space-y-4">
//             <div className="flex items-center gap-2">
//               <Image src={logo} alt="FreshCart Logo" width={140} height={35} />
//             </div>
//             <p className="text-xs text-gray-500 leading-relaxed">
//               Your one-stop destination for the latest technology, fashion, and lifestyle products.
//               Quality guaranteed with fast shipping and excellent customer service.
//             </p>

//             <div className="space-y-2 text-xs text-gray-500 pt-2">
//               <div className="flex items-center gap-2">
//                 <svg className="size-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 <span>123 Shop Street, October City, DC 12345</span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <svg className="size-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 <span>(+20) 01093333333</span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <svg className="size-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 <span>support@freshcart.com</span>
//               </div>
//             </div>
//           </div>

//           {/* Column 1: SHOP */}
//           <div>
//             <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">Shop</h4>
//             <ul className="space-y-2.5 text-xs font-medium text-gray-600">
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Electronics</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Fashion</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Home & Garden</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Sports</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Deals</Link></li>
//             </ul>
//           </div>

//           {/* Column 2: CUSTOMER SERVICE */}
//           <div>
//             <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">Customer Service</h4>
//             <ul className="space-y-2.5 text-xs font-medium text-gray-600">
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Contact Us</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Help Center</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Track Your Order</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Returns & Exchanges</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Size Guide</Link></li>
//             </ul>
//           </div>

//           {/* Column 3: ABOUT */}
//           <div>
//             <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">About</h4>
//             <ul className="space-y-2.5 text-xs font-medium text-gray-600">
//               <li><Link href="#" className="hover:text-green-600 transition-colors">About FreshCart</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Careers</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Press</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Investor Relations</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Sustainability</Link></li>
//             </ul>
//           </div>

//           {/* Column 4: POLICIES */}
//           <div>
//             <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">Policies</h4>
//             <ul className="space-y-2.5 text-xs font-medium text-gray-600">
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Privacy Policy</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Terms of Service</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Cookie Policy</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Shipping Policy</Link></li>
//               <li><Link href="#" className="hover:text-green-600 transition-colors">Refund Policy</Link></li>
//             </ul>
//           </div>

//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import logo from "./../assets-20260902T144900Z-1-001/assets/images/freshcart-logo.svg";
 
 
export default function HomeMainLayout() {
  const { data: session, status } = useSession();

  // جلب اسم المستخدم عند تسجيل الدخول
  const userName = session?.user?.name;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      
      {/* ================= HERO SECTION ================= */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        
        {/* إظهار اسم المستخدم فقط لو تسجيل الدخول نشط */}
        {status === "authenticated" && userName && (
          <span className="text-sm font-medium text-green-700 bg-green-50 px-3.5 py-1 rounded-full mb-3 border border-green-200/60">
            Hi, {userName} 
          </span>
        )}

      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Welcome to <span className="text-emerald-600">ShopMart</span>
        </h1>

        <p className="max-w-2xl text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
          Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with
          fast shipping and excellent customer service.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <Link
            href="/Shop"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Shop Now
          </Link>

          <Link
            href="/Home"
            className="border border-gray-300 hover:border-green-600 hover:text-green-700 text-gray-700 font-semibold px-6 py-2.5 rounded-lg transition-colors bg-white"
          >
            Browse Categories
          </Link>
        </div>
      </section>

      {/* ================= FOOTER SECTION ================= */}


    </div>
  );
}