import React, { useState } from 'react'
import { useAuth } from '../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase-config"
import { nanoid } from 'nanoid'

interface IUserData{
  name: string,
  password: string,
  email:string
}

interface ILoginData{
  emailV: string,
  passwordV:string
}

const AuthenticationPage = () => {

  const [userData, setUserData] = useState<IUserData>({
    name: "",
    password: "",
    email:""
  })

  const [loginData, setLoginData] = useState<ILoginData>({
    emailV: "",
    passwordV:""
  })

  const navigator = useNavigate()
  const { createAccount,signIn } = useAuth()
  
  const formHandler = (e:React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    console.log(value)
        setUserData({
          ...userData,
          [name] : value
        })
  }
  
  const loginHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    setLoginData({
          ...loginData,
          [name] : value
        })

  }

  const accountCreater = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    createAccount(userData.email, userData.password)
    .then(
      (response) => {
          console.log(response?.user?.uid);
          setDoc(doc(db, "users", response?.user?.uid), {
            name: userData.name,
            email: userData.email,
            id: nanoid()
          })
      }).then(() => {
        navigator('/')
      })

  }

  const accountVerify = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    signIn(loginData.emailV, loginData.passwordV)
    .then(
      (response) => {
          console.log(response)
          console.log(response?.user?.uid);
          // writeUserData(name, email, response?.user?.uid);
          navigator('/')
      })
  }

  return (
    <div className='w-[1400px] bg-teal-900 app-full-height rounded-sm'>
    <div className='w-full h-full'>
      
      <form className='flex flex-col items-center justify-center' action="">
        <div className='p-2 text-2xl text-white'>SignUp</div>
        <input className='w-96 p-2 m-2 rounded-md' onChange={formHandler} type="text" placeholder='name' name="name" value={userData.name} />
        <input className='w-96 p-2 m-2 rounded-md' onChange={formHandler} type="email" placeholder='email' name="email" value={userData.email} />
        <input className='w-96 p-2 m-2 rounded-md' onChange={formHandler} type="password" placeholder='password' name="password" value={userData.password} />
        <button onClick={accountCreater} className='border-2 rounded bg-emerald-500 p-2'>SignUp</button>
      </form>

      
      <form className='flex flex-col items-center justify-center' action="">
        <div className='p-2 text-2xl text-white'>Log in</div>
        <input className='w-96 p-2 m-2 rounded-md' onChange={loginHandler} type="email" placeholder='email' name="emailV" value={loginData.emailV} />
        <input className='w-96 p-2 m-2 rounded-md' onChange={loginHandler} type="password" placeholder='password' name="passwordV" value={loginData.passwordV} />
        <button onClick={accountVerify} className='border-2 rounded bg-emerald-500 p-2'>Login</button>
      </form>
    </div>
    </div>
    
  )
}

export default AuthenticationPage;