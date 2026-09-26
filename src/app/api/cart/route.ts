import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
export async  function GET(req:NextRequest){

    const token=await getToken({req:req})
if(!token){
    return NextResponse.json({message:'unuthorized',status:401})

}
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: 'GET',
      headers: {
        token: token.token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) { return NextResponse.json(
        { message: 'Failed to fetch cart from server' },
        { status: response.status }
      );}

    const payload = await response.json();

    return NextResponse.json(payload,{ status: 200 })

  } catch (error) {
return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }

}