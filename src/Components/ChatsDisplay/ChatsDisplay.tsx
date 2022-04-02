import React, { useEffect, useState } from 'react'
import profileDefault from '../../Images/profileDefault.png'
import TripleDot from '../../Icon/TripleDot'
import SubmitIcon from '../../Icon/SubmitIcon'
import { useTopLevelContext } from '../../Hooks/useContextProvider'
// import {msgUpload} from '../../api/getUserData'
// import useUsersFromDatabase from '../../Hooks/useUsersFromDatabase'
import { doc, setDoc , getDoc , onSnapshot,collection,limit,query } from "firebase/firestore"; 
import db from '../../firebase-config'
import { nanoid } from 'nanoid'
import RightChatComponent from '../RightChatComponent/RightChatComponent'
// import { nanoid } from 'nanoid'

// type TChatsDisplay = {
//     showPanel:boolean
// }
interface IMessages{
    reciever: string
    sender: string
    messageContent:string
}

const ChatsDisplay = () => {
    
    const [message, setMessage] = useState<string>("")
    const { dispatch } = useTopLevelContext()
    const [messageList,setMessageList] = useState<IMessages[]>([])
    
    const messageSetter = (e:React.FormEvent<HTMLInputElement>):void => {
        const { value } = e.currentTarget
        setMessage(value)
    }

    const arrayObj = {
        chatIds : []
    }

    const { state } = useTopLevelContext()

    useEffect(() => {

        const q = query(collection(db, "messages",state.chatId,"message"), limit(10));
        const unsub = onSnapshot(q, (doc: any) => {
            let messages:IMessages[] = []
            doc.forEach((d:any) => {
                console.log(d.data())
                messages.push(d.data())
            })

            setMessageList(messages)
        });

        return unsub;

    },[state.chatId])
    
    const uploadMsgToChat = async () => {
        
        if (state.setNewChat) {
            const senderRef = doc(db, "chats", state.senderId);
            const recieverRef = doc(db, "chats", state.recieverId);

            const senderChats = (await getDoc(senderRef)).data() || arrayObj
            const recieverChats = (await getDoc(senderRef)).data() || arrayObj


            console.log(senderChats, recieverChats)

            console.log(senderChats.chatIds)
            
            let despObj = {
                chatId: state.chatId,
                reciever: state.recieverId,
                sender:state.senderId
            }
            await setDoc(senderRef, {
                chatIds: [despObj,...senderChats.chatIds]
            });

            
            await setDoc(recieverRef, {
                chatIds: [despObj,...recieverChats.chatIds]
            });

            await setDoc(doc(db, "messages", state.chatId ,"message", nanoid()),{
                sender: state.senderId,
                reciever: state.recieverId,
                messageContent : message
            });        
            dispatch({ type: "setNewChat", payload: state.chatId })

        } else {
            await setDoc(doc(db,"messages",state.chatId,"message",nanoid()),{
                sender: state.senderId,
                reciever: state.recieverId,
                messageContent : message
            });
        }
    }
    
    return (
      <div className='w-full h-full relative flex flex-col'>
          <nav className='relative px-4 py-2 flex justify-between items-center z-20 bg-teal-900'>
              <div className='flex items-center'>
                  <img className='rounded-full w-12 mr-2' src={profileDefault} alt="" />
                        <div className='text-white text-lg'>{state.reciever}</div>
              </div>
              <TripleDot />
          </nav> 
            <div className='relative h-4/5 w-full bg-slate-800 flex flex-col-reverse gap-y-2 px-4 pb-4 justify-start'>
                {
                    messageList.map((message: IMessages) => {
                        console.log(message)
                        return <RightChatComponent key={nanoid()} messageContent={message.messageContent} />
                    })
                }
          </div>
          <form className='self-end w-full p-4 flex bg-teal-900'>
              <input onChange={messageSetter} type="text" placeholder='Type a message' name='message' value={message} className='p-2 w-full rounded-md outline-none text-white bg-slate-600' />
                    <button onClick={(e) => {
                        e.preventDefault()
                        // msgUpload(state.senderId,state.recieverId,message)
                        uploadMsgToChat()
                    }} className='m-2'><SubmitIcon /></button>
          </form>
      </div>
  )
}

export default ChatsDisplay;