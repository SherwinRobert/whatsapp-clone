import React from 'react'
import { useAuth } from '../Hooks/useAuth'
// import { doc, setDoc } from "firebase/firestore";
// import db from "../firebase-config"
// import { nanoid } from 'nanoid'

const GuestUsersPage = () => {
    const {signIn } = useAuth()
    
    const accountVerify1 = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    signIn("guest1@gmail.com", "guest1")
    .then(
      (response) => {
          console.log(response)
          console.log(response?.user?.uid);
            const a = document.createElement("a");
            a?.setAttribute("target", "_blank");
            a.setAttribute("href",`/${response?.user?.uid}`);
            a.click();
            a.remove();
      })
    }
    
    const accountVerify2 = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    signIn("guest2@gmail.com", "guest2")
    .then(
      (response) => {
          console.log(response)
          console.log(response?.user?.uid);
            const a = document.createElement("a");
            a?.setAttribute("target", "_blank");
            a.setAttribute("href",`/${response?.user?.uid}`);
            a.click();
            a.remove();
      })
  }
  return (
      <div className="w-1/2 h-1/2 bg-teal-700 rounded-md flex justify-center flex-col items-center relative">
          <div className='text-white font-semibold text-3xl my-3'>
              Click on both the Users to Chat in Realtime
          </div>
          <div className="flex gap-2">
              <div onClick={accountVerify1} className="w-40 h-20 bg-emerald-800 rounded-md text-center text-xl text-white font-medium pt-6 shadow-md cursor-pointer active:bg-emerald-600">Guest 1</div>
              <div onClick={accountVerify2} className="w-40 h-20 bg-emerald-800 rounded-md text-center text-xl text-white font-medium pt-6 shadow-md cursor-pointer active:bg-emerald-600">Guest 2</div>
          </div>
          <div className='absolute bottom-10 text-gray-800'>
              This is not the final version, only the basic chat feature is implemented.
          </div>
    </div>
  )
}

export default GuestUsersPage