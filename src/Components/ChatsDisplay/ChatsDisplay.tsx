import React, { useState } from 'react'
import frontImage from '../../Images/frontImage.jpg'
import LeftChatComponent from '../LeftChatComponent/LeftChatComponent'
import RightChatComponent from '../RightChatComponent/RightChatComponent'
import profileDefault from '../../Images/profileDefault.png'
import TripleDot from '../../Icon/TripleDot'
import SubmitIcon from '../../Icon/SubmitIcon'

type TChatsDisplay = {
    showPanel:boolean
}

const ChatsDisplay = ({ showPanel }: TChatsDisplay) => {
    
    const [message, setMessage] = useState<string>("")
    
    const messageSetter = (e:React.FormEvent<HTMLInputElement>):void => {
        const { value } = e.currentTarget
        setMessage(value)
    }
    
    return (
        showPanel ? 
        <div className='flex flex-col items-center justify-center w-full'>
          <img className='rounded-full' src={frontImage} alt="" />
          <div className='flex flex-col items-center'>
              <h1 className='text-3xl text-center my-2 text-white'>Keep Your Phone Connected</h1>
              <div className='text-center w-[650px] text-gray-300'>What's App connects to your phone to sync your messages. To reduce data usage, connect your phone to Wi-Fi</div>
          </div>
        </div>
            
        :
            
      <div className='w-full h-full relative flex flex-col'>
          <nav className='relative px-4 py-2 flex justify-between items-center z-20 bg-teal-900'>
              <div className='flex items-center'>
                  <img className='rounded-full w-12 mr-2' src={profileDefault} alt="" />
                  <div className='text-white text-lg'>UserName</div>
              </div>
              <TripleDot />
          </nav> 
          <div className='relative h-4/5 w-full bg-slate-800 flex flex-col gap-y-2 px-4 pb-4 justify-end'>
              <RightChatComponent />
              <RightChatComponent />
              <LeftChatComponent />
                <RightChatComponent />
              <RightChatComponent />
              <LeftChatComponent />
          </div>
          <form className='self-end w-full p-4 flex bg-teal-900'>
              <input onChange={messageSetter} type="text" placeholder='Type a message' name='message' value={message} className='p-2 w-full rounded-md outline-none text-white bg-slate-600' />
              <button className='m-2'><SubmitIcon /></button>
          </form>
      </div>
  )
}

export default ChatsDisplay;