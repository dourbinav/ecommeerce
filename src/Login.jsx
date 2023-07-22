import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";


function Login(props) {

  const [username,setusername]= useState('')
  const [password,setpassword]=useState('')
  const [loading,setloading]=useState(false)
  
  const navigate=useNavigate()

const [error,seterror]=useState("")

  const submithandler = (event) => {
    setloading(true)
    axios.post("https://ecommeerce.vercel.app/user/login",{
     username:username,
     password:password
    }).then(res=>{
      console.log(res)
     const {username,token} = res.data
     props.setuser(username)
     localStorage.clear()
     localStorage.setItem("user",username)
     if(!token){
      alert('Unable to login. Please try after some time.');
            return;
     }
     localStorage.setItem("user-token",token)
      setloading(false)
      navigate('/dashboard');
    }).catch(err => {
      setloading(false)
       seterror(err.response.data.msg)
    })
   }
   if(loading){
    return <Loading />
   }
  return (
    <div>
    <div className="flex items-center justify-center h-screen   ">
      <div  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-64 w-64 flex-col items-center  bold p-3 text-center text-white">
        Login 
        <form className="flex flex-col m-auto text-black w-40 mt-10  gap-y-4">
          <input id="name" type="text" className="rounded-sm" placeholder="name" value={username} onChange={(e)=>{setusername(e.target.value)}} />
          <input type="password" className="border-lime-500 rounded-sm" placeholder="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} />
          <button className="bg-blue-200 border-black" type="submit" onClick={submithandler} >
            Login
          </button>
        </form>
        <div className="flex justify-between p-2 text-black">
          <button className='bg-gray-300 m-2 p-1 rounded-sm'>Google</button>
          <button className='bg-gray-300 m-2 p-1 rounded-sm'>forgot</button>
        </div>
        {error && <div className="text-red-500 font-bold">{error}</div>}
      </div>
    </div>
    </div>
  );
}
export default Login;
