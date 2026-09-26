import *as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone } from 'lucide-react';

export let schema= zod.object({
  name:zod.string().nonempty('Name Req').min(3 , 'Min 3 Letters').max(5 , 'Max 5 Letters'),
  email:zod.string().nonempty('Name Req').email('Invalid Email') ,
  password:zod.string().nonempty('Password Req').regex(/^(?=.*[A-Z])(?=.*[0-9])/),
  rePassword:zod.string().nonempty('rePassword Req') ,
Phone:zod.string().nonempty('phone Req').regex(/^01[0125][0-9]{8}$/,'Invalid phone') 

}).refine((obj)=>{
  if(obj.password === obj.rePassword){
    return true
  }
  else{
    return false
  }
},{path:['rePassword'],message:'not matched'})