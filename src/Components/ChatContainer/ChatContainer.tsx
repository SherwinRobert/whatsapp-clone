import { useEffect, useState } from 'react'
import TripleDot from '../../Icon/TripleDot'
import ChatIcon from '../../Icon/ChatIcon'
import ChatFrontComponent from '../ChatFrontComponent/ChatFrontComponent'
import profileDefault from '../../Images/profileDefault.png'
import FindPeopleComponent from '../FindPeopleComponent/FindPeopleComponent'
import { IUsers } from '../../Interfaces/Interfaces'
import { useAuth } from '../../Hooks/useAuth'
// import { query, collection, getDocs, where} from "firebase/firestore"
import { doc, getDoc } from "firebase/firestore";
import db from '../../firebase-config'
import { useTopLevelContext } from '../../Hooks/useContextProvider'
import {nanoid} from 'nanoid'

interface IChatContainer{
  togglePanel: () => void,
  users : IUsers[]
}

interface IChat{
  chatId: string,
  reciever: string,
  sender:string
}

const ChatContainer = ({ togglePanel, users }: IChatContainer) => {

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showFindPeople, setShowFindPeople] = useState<boolean>(false)
  const { logOut } = useAuth()
  const { state } = useTopLevelContext()
  const [userInfo, setUserInfo] = useState<IChat[]>([])
  
  const toggleMenu = (): void => {
    setShowMenu(!showMenu)
  }

  const toggleFindPeople = () => {
    setShowFindPeople(true)
  }

  const getUserInfo = async () => {

    if (state.senderId) {
      const docRef = doc(db, "chats", state.senderId);
      const docSnap = (await getDoc(docRef)).data()
      console.log(docSnap)
      setUserInfo(docSnap!.chatIds || [])
    }

  }

  useEffect(() => {
    getUserInfo()
  },[state.senderId])

  console.log(userInfo)
  return (
    <div className='w-[400px] relative bg-slate-800 border-r-[1px] border-r-gray-500'>
      {showFindPeople && <div className='absolute h-full'>
        <FindPeopleComponent users = {users} setShowFindPeople = {setShowFindPeople} togglePanel={togglePanel}  />
      </div>}
      {showMenu && <div className='absolute z-10 right-10 top-12 bg-teal-900 shadow-lg rounded-sm text-white border-[1px] border-teal-800'>
        <div className='p-2 hover:bg-teal-800 cursor-pointer'>New Chat</div>
        <div onClick={logOut} className='p-2 hover:bg-teal-800 cursor-pointer'>Log Out</div>
      </div>}
      <nav className="flex items-center justify-between bg-teal-900 px-4 py-2 ">
        <div>
          <img className='rounded-full w-12' src={profileDefault} alt="" />
        </div>
        <div className='flex justify-between'>
          <div onClick={toggleFindPeople} className='mr-4 cursor-pointer'>
            <ChatIcon />
          </div>
          <div className='cursor-pointer' onClick={toggleMenu}>
              <TripleDot />
          </div>
        </div>
              
        </nav>
      
          <div className='p-2 border-b-[1px] border-b-gray-500'>
              <input type="text" placeholder='Search or start new chat' className='text-white outline-none w-full bg-slate-600 p-2 rounded-md' />
          </div>
          <section className='overflow-y-scroll h-[82%]'>
          {/* <ChatFrontComponent togglePanel={togglePanel} /> */}
        {
          userInfo?.map((user) => {
            return <ChatFrontComponent key={nanoid()} user={user} togglePanel={togglePanel}/>
          })

        }
          </section>
    </div>
  )
}

export default ChatContainer