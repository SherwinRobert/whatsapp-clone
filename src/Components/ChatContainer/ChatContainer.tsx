import React from 'react'
import TripleDot from '../../Icon/TripleDot'
import ChatFrontComponent from '../ChatFrontComponent/ChatFrontComponent'
import profileDefault from '../../Images/profileDefault.png'

interface IChatContainer{
    togglePanel: ()=>void
}
const ChatContainer = ({togglePanel}:IChatContainer) => {

  return (
      <div className='w-[400px] bg-slate-800 border-r-[1px] border-r-gray-500'>
      <nav className="flex items-center justify-between bg-teal-900 px-4 py-2 ">
        <div>
          <img className='rounded-full w-12' src={profileDefault} alt="" />
        </div>
              <div>
                <TripleDot />
              </div>
        </nav>
      
          <div className='p-2 border-b-[1px] border-b-gray-500'>
              <input type="text" placeholder='Search or start new chat' className='text-white outline-none w-full bg-slate-600 p-2 rounded-md' />
          </div>
          <section className='overflow-y-scroll h-[82%]'>
            <ChatFrontComponent togglePanel={togglePanel} />
            <ChatFrontComponent togglePanel={togglePanel} />
            <ChatFrontComponent togglePanel={togglePanel} />
            <ChatFrontComponent togglePanel={togglePanel} />
            <ChatFrontComponent togglePanel={togglePanel} />
            <ChatFrontComponent togglePanel={togglePanel} />
            <ChatFrontComponent togglePanel={togglePanel} />
            <ChatFrontComponent togglePanel={togglePanel} />
            <ChatFrontComponent togglePanel={togglePanel} />
            <ChatFrontComponent togglePanel={togglePanel} />
          </section>
    </div>
  )
}

export default ChatContainer