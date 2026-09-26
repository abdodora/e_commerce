import React from 'react'
import { getBrands } from '@/Apis/apibrands'
import Link from 'next/link';
import Image from 'next/image';
export default async function Prand() {
 const data= await getBrands()
// console.log(data)
return (
    <section className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-8 py-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm opacity-90 mb-4 font-medium">
            <Link href="/"><span>Home</span></Link>
            <span className="mx-1">/</span>
            <span className="font-semibold text-white">Brands</span>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
              {/* <Tag className="w-7 h-7 text-white -rotate-90" /> */}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Top Brands</h1>
              <p className="text-sm text-purple-100 mt-1">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {data?.map((brand) => (
            <Link key={brand._id} href={`/spacificBrand/${brand._id}`} className="block">
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-between group cursor-pointer h-full">
                <div className="w-full h-36 bg-gray-50/80 rounded-xl flex items-center justify-center p-4 mb-3 border border-gray-50 group-hover:bg-gray-100/60 transition-colors">
                  <Image
                  height={300}
                  width={300}
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-800 tracking-wide text-center">
                  {brand.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div> 
    </section>
  );
}
