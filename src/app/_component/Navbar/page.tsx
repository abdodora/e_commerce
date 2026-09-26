 
"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { signOut, useSession } from "next-auth/react";
import { CartRespons } from "@/Apis/types/cartTypes";
import { useQuery } from "@tanstack/react-query";
import Logo from './../logo/Logo';

export default function Navbar({ categories = [] }: { categories?: any[] }) {

  const { data: session, status } = useSession();

  // جلب اسم المستخدم عند تسجيل الدخول
  const userName = session?.user?.name;

  const finall = categories.length;
  const elemnt = categories[finall - 1];

  const featuredCategories = categories.slice(0, 4);
  if (elemnt) featuredCategories.push(elemnt);

  function LogOut() {
    signOut({ redirect: true, callbackUrl: '/Login' });
  }

  const { data: cartData } = useQuery<CartRespons>({
    queryKey: ['GetCart'],
    queryFn: async () => {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('Failed to fetch cart')
      return response.json()
    },
    enabled: status === "authenticated" // تنفيذ الاستعلام فقط إذا كان المستخدم مسجل دخول
  })

  return (
    <NavigationMenu className="max-w-full bg-gray-100 dark:bg-[#0A2025] p-3 sticky top-0 z-50 shadow-sm">
      <NavigationMenuList className="flex justify-between w-full items-center max-w-7xl mx-auto px-2">

        <Logo />

        {/* Desktop Navigation Links */}
        <div className="md:flex gap-6 hidden items-center">
          <NavigationMenuItem>
            <Link className="font-bold hover:text-green-700 transition-colors" href="/Home">Home</Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link className="font-bold hover:text-green-700 transition-colors" href="/Shop">Shop</Link>
          </NavigationMenuItem>

<NavigationMenuItem>
  <NavigationMenuTrigger>
    <span className="font-bold hover:text-green-700 transition-colors">
      Categories
    </span>
  </NavigationMenuTrigger>

  <NavigationMenuContent>
    <ul className="w-80 p-2 grid gap-1 bg-white dark:bg-[#122B31] rounded-lg shadow-md">
      {/* خيار عرض كل الأقسام */}
      <ListItem href="/Category">
        <span className="font-semibold text-gray-700 dark:text-gray-200 hover:text-green-700 transition-colors">
          All Categories
        </span>
      </ListItem>

      {/* قائمة الأقسام المحددة */}
      {featuredCategories.map((cat) => (
        <ListItem
          key={cat._id}
          href={`/specificCategory/${cat._id}`}
        >
          <span className="font-semibold text-gray-700 dark:text-gray-200 hover:text-green-700 transition-colors">
            {cat.name}
          </span>
        </ListItem>
      ))}
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>

          <NavigationMenuItem>
            <Link className="font-bold hover:text-green-700 transition-colors" href="/Prand">Brands</Link>
          </NavigationMenuItem>
        </div>

        {/* User / Cart / Auth Actions (Desktop) */}
        <div className="md:flex gap-5 hidden items-center">
          {status === "authenticated" ? (
            <>
              {/* Cart Icon with Badge */}
              <Link href="/cart" className="relative p-1 text-gray-700 dark:text-gray-200 hover:text-green-700 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                {Boolean(cartData?.numOfCartItems) && (
                  <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartData?.numOfCartItems}
                  </span>
                )}
              </Link>

              {/* Wishlist Icon */}
              <Link href="/wishlist" className="p-1 text-gray-700 dark:text-gray-200 hover:text-green-700 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </Link>  

              {/* Greeting Badge */}
              {userName && (
                <span className="text-sm font-medium text-green-700 bg-green-50 dark:bg-green-950/40 dark:text-green-300 px-3.5 py-1 rounded-full border border-green-200/60 dark:border-green-800/60">
                  Hi, {userName} 
                </span>
              )}

              {/* User Dropdown */}
              <NavigationMenuItem className="list-none">
                <NavigationMenuTrigger className="p-1 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-green-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="w-44 p-2 grid gap-1 bg-white dark:bg-[#122B31] rounded-lg shadow-lg">
                    <ListItem href="/change-password">
                      <span className="font-semibold text-gray-700 dark:text-gray-200 hover:text-green-700 transition-colors">
                        Change Password
                      </span>
                    </ListItem>
                    <ListItem href="/Adress">
                      <span className="font-semibold text-gray-700 dark:text-gray-200 hover:text-green-700 transition-colors">
                        My Address
                      </span>
                    </ListItem>
                    <ListItem href="/allorders">
                      <span className="font-semibold text-gray-700 dark:text-gray-200 hover:text-green-700 transition-colors">
                        My Orders
                      </span>
                    </ListItem>
                    
                    <li>
                      <button
                        onClick={LogOut}
                        className="w-full text-left p-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </>
          ) : (
            <Button className="bg-emerald-600 hover:bg-emerald-700 px-5 text-white rounded-full font-medium" asChild>
              <Link href="/Login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <NavigationMenuItem className="md:hidden list-none">
          <NavigationMenuTrigger className="p-2 bg-transparent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="w-64 p-3 bg-white dark:bg-[#122B31] rounded-xl shadow-xl flex flex-col gap-1">
              <ListItem href="/Home" title="Home" />
              <ListItem href="/Shop" title="Shop" />
              <ListItem href="/Prand" title="Brands" />
              <ListItem href="/Category" title="Categories" />

              {status === "authenticated" ? (
                <>
                  <hr className="my-1 border-gray-100 dark:border-gray-800" />
                  <ListItem href="/cart" title={`Cart (${cartData?.numOfCartItems || 0})`} />
                  <ListItem href="/wishlist" title="Wishlist" />
                  <ListItem href="/Adress" title="Address" />
                  <ListItem href="/allorders" title="My Orders" />
                  <ListItem href="/change-password" title="Change Password" />
                  <li>
                    <button
                      onClick={LogOut}
                      className="w-full text-left p-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <li className="mt-2">
                  <Button className="w-full bg-emerald-600 text-white rounded-full" asChild>
                    <Link href="/Login">Sign In</Link>
                  </Button>
                </li>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; title?: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link href={href}>
        <div className="flex flex-col gap-1 text-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
          {title && <div className="leading-none font-medium text-gray-800 dark:text-gray-200">{title}</div>}
          {children}
        </div>
      </Link>} />
    </li>
  );
}