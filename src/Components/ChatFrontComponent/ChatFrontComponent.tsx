import React from 'react'
import { useContext } from 'react'
import profileDefault from '../../Images/profileDefault.png'

interface IChatFrontComponent{
  togglePanel : ()=> void
}

const ChatFrontComponent = ({togglePanel} : IChatFrontComponent) => {
  return (
    <div onClick={togglePanel} className="p-2 flex items-center relative cursor-pointer active:bg-slate-500">
      <img className='rounded-full w-12 h-12 mr-2' src={profileDefault} alt="" />
      <div className='w-5/6 border-b-[1px] py-2 border-b-gray-500'>
        <div className='flex justify-between'>
          <div className='text-white'>UserName</div>
          <small className='text-gray-400'>7:37 AM</small>
        </div>
        <div className="text-gray-400 truncate">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi</div>
      </div>
    </div>
  )
}

export default ChatFrontComponent