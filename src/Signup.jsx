import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
 function Signup() {
  const[username,setusername]=useState("")
  const[password,setpassword]=useState("")
  const[email,setemail]=useState("")
  const[phone,setphone]=useState('')

  const[er,seter]=useState("")

   let navigate = useNavigate()
  // const user=localStorage.getItem("user")
  // if(!user || user == undefined ){
  //   navigate('/login')
  // }

  function submithandler(){
    if(username=="" || password==""||email==""||phone==""){
      return;
    }
    axios.post('https://ecommeerce.vercel.app/user/signup',{
      username:username,
      password:password,
      phone:phone,
      email:email
    }).then(res =>{
      console.log(res)
      navigate('/dashboard')
    })
    .catch(err => {
      if(err){
        console.log(err.response.data.msg)
        seter(err.response.data.msg)
      }
      
    })
    
  }
  return (
    <div className='h-screen flex items-center justify-center'>
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 w-64 h-64 p-2'>
      <h2 className='text-center font-bold text-2xl' >Signup page</h2>
      <form className='flex flex-col m-auto space-y-2 w-40 pt-4 my-auto'>
      <input required className='rounded-sm text-sm' id='name' type="text" value={username} onChange={(e)=>(setusername(e.target.value))}  placeholder='name'/>
      <input required className='rounded-sm text-sm ' type='password' value={password}  onChange={(e)=>(setpassword(e.target.value))}  placeholder='password' />
      <input required className='rounded-sm text-sm ' type="email" value={email}  onChange={(e)=>(setemail(e.target.value))} placeholder='email'/>
      <input required className='rounded-sm text-sm focus:border-blue-300 ' type="number" value={phone}  onChange={(e)=>(setphone(e.target.value))} placeholder='phonenumber' />
      <button  className="bg-blue-200 font-semibold   border-blue-300" type='submit' onClick={submithandler}>Submit</button>
      </form>
      {er && <div className='text-red-700 font-bold'>{er}</div>}
      <div className="flex justify-between">
      <button className='bg-gray-300 m-2 p-1 text-sm rounded-sm font-semibold '><Link to="/login">already user</Link></button>
      <button className='bg-gray-300 m-2 p-1 text-sm font-semibold rounded-sm'>  Google</button>
      </div>
    </div>
    </div>
  )
}
export default Signup;
