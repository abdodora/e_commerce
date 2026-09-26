import React from 'react'
import CheckOutForm from '../CheckOutForm'
type Props = {
  params: {
    cartid: string
  }
}
export default async function checkOut(prors:Props) {
  const promis=await prors.params
    
  const {cartid}=promis


   
  return (
    <CheckOutForm cartId={cartid}></CheckOutForm>
  )
}
