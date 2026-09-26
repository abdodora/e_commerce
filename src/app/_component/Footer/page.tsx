import React from 'react'
import Image from "next/image";
import logo from "../../../assets-20260902T144900Z-1-001/assets/images/freshcart-logo.svg"; // تأكد من مسار اللوجو لديك
import Link from "next/link";
import Logo from './../logo/Logo';

export default function Footer() {
  return (
          <footer className="border-t border-gray-100 bg-gray-50/50 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <Logo/>
             </div>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              Your one-stop destination for the latest technology, fashion, and lifestyle products.
              Quality guaranteed with fast shipping and excellent customer service.
            </p>

            <div className="space-y-2 text-xs text-gray-500 pt-2">
              <div className="flex items-center gap-2">
                <svg className="size-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Shop Street, Octoper City, DC 12345</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="size-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(+20) 01093333333</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="size-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@freshcart.com</span>
              </div>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">SHOP</h4>
            <ul className="space-y-2.5 text-xs font-medium text-gray-600">
              <li><Link href="/Shop" className="hover:text-green-600 transition-colors">Electronics</Link></li>
              <li><Link href="/Shop" className="hover:text-green-600 transition-colors">Fashion</Link></li>
              <li><Link href="/Shop" className="hover:text-green-600 transition-colors">Home & Garden</Link></li>
              <li><Link href="/Shop" className="hover:text-green-600 transition-colors">Sports</Link></li>
              <li><Link href="/Shop" className="hover:text-green-600 transition-colors">Deals</Link></li>
            </ul>
          </div>

          {/* Column 2: CUSTOMER SERVICE */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">CUSTOMER SERVICE</h4>
            <ul className="space-y-2.5 text-xs font-medium text-gray-600">
              <li><Link href="#" className="hover:text-green-600 transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Column 3: ABOUT */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">ABOUT</h4>
            <ul className="space-y-2.5 text-xs font-medium text-gray-600">
              <li><Link href="#" className="hover:text-green-600 transition-colors">About FreshCart</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Press</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Investor Relations</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Column 4: POLICIES */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">POLICIES</h4>
            <ul className="space-y-2.5 text-xs font-medium text-gray-600">
              <li><Link href="#" className="hover:text-green-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-green-600 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

        </div>
      </footer>
  )
}
