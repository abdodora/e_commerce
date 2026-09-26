import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req:NextRequest){
 const pathname=req.nextUrl.pathname
const protectPage=['/cart','/wishlist','/allorders','/Adress']
const authPage=['/Login','/Register','/forgetPassword']

 const myToken=await getToken({
    req:req,
    secret:process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV==='production'
 })
 const accessToken=myToken?.token  

 if(!accessToken && protectPage.some((path)=>pathname.startsWith(path))){
    return NextResponse.redirect(new URL('/Login',req.nextUrl))
 }

  if(accessToken && authPage.some((path)=>pathname.startsWith(path))){
    return NextResponse.redirect(new URL('/',req.nextUrl))
 }


 return NextResponse.next()
}













