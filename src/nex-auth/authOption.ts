import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const authOptions : NextAuthOptions ={
    providers:[
        Credentials({
            name:'myLogin' ,


            credentials:{
        email:{type:'email' , label:'Email' , placeholder:'Enter Emial'},
        password:{type:'password' , label:'password' , placeholder:'Enter password'},
    } , 
  async  authorize(credentials){
      
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin` , {
    method:'POST' ,
    body: JSON.stringify({
        email:credentials?.email ,
        password:credentials?.password
    }) ,
    headers:{
      'Content-Type': 'application/json'
    }
  })


  if(!response.ok){
    throw new Error(response.statusText)
  }


  const payload=  await response.json()
  console.log('payload' , payload)

const decoded:{id:string} = jwtDecode(payload.token);


console.log('payload' , payload)
  console.log('payload jwt',decoded)


  return {
    id:decoded.id,
    name:payload.user.name,
    email:payload.user.email,
    token:payload.token

  }
    } 

        })
    ],
callbacks: {
  jwt({ token, user }) {
 if(user){
   token.id=user.id
  token.token=user.token
 }
    return token;
    console.log(token.token)
  },

  session({session,token}){
if(token){
session.user.id=token.id
}

return session
  }
},
    
    pages:{
        signIn:'/Login'
    }





}
