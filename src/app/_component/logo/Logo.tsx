import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/Home" className={`flex items-center gap-2 group ${className}`}>
      {/* Icon */}
      <div className="bg-emerald-600 text-white font-bold rounded-lg w-8 h-8 flex items-center justify-center text-lg shadow-sm group-hover:bg-emerald-700 transition-colors">
        S
      </div>
      {/* Text */}
      <span className="font-extrabold text-xl text-emerald-600 tracking-tight group-hover:text-emerald-700 transition-colors">
        ShopMart
      </span>
    </Link>
  );
}