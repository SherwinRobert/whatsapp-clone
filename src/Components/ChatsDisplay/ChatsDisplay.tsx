import React, { useEffect, useState } from 'react'
import profileDefault from '../../Images/profileDefault.png'
import TripleDot from '../../Icon/TripleDot'
import SubmitIcon from '../../Icon/SubmitIcon'
import { useTopLevelContext } from '../../Hooks/useContextProvider'
import { doc, setDoc, serverTimestamp} from "firebase/firestore"; 
import db from '../../firebase-config'
import { nanoid } from 'nanoid'
import RightChatComponent from '../RightChatComponent/RightChatComponent'
import LeftChatComponent from '../LeftChatComponent/LeftChatComponent'
// import { useAuth } from '../../Hooks/useAuth'
import { useMessages,IMessages } from '../../Hooks/useMessages'


interface IChatMeta{
    chatId: string,
    reciever: string,
    recieverName:string
}

const ChatsDisplay = () => {
    
    // const {user} = useAuth()
    const [message, setMessage] = useState<string>("")
    const { state, dispatch } = useTopLevelContext()
    // const [messageList, setMessageList] = useState<IMessages[]>([])
    const [messageList] = useMessages(state.chatId)
    
    const messageSetter = (e:React.FormEvent<HTMLInputElement>):void => {
        const { value } = e.currentTarget
        setMessage(value)
    }

    // useEffect(() => {

    //     if (state.chatId) {
    //         try {
    //         const q = query(collection(db, "messages",state.chatId,"message"),orderBy("timeStamp", "desc"),limit(8));
    //         const unsub = onSnapshot(q, (doc: any) => {
    //         let messages:IMessages[] = []
    //         doc.forEach((d:any) => {
    //             console.log(d.data())
    //             messages.push(d.data())
    //         })

    //         setMessageList(messages)
    //         });
            
    //         return unsub;
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     }
        
    // }, [state.chatId])
    
    useEffect(() => {
        console.log("the element is",state.ref?.current)
    },[])
  
    
    const uploadMsgToChat = async () => {
        if (state.setNewChat) {
            const chatId:string = nanoid()
            const senderRef = doc(db, "chats", state.senderId,"chatIds",chatId);
            const recieverRef = doc(db, "chats", state.recieverId,"chatIds",chatId);
            
            let chatObjSender:IChatMeta = {
                chatId: state.chatId,
                reciever: state.recieverId,
                recieverName:state.reciever
            }

            let chatObjReciever:IChatMeta = {
                chatId: state.chatId,
                reciever: state.senderId,
                recieverName:state.userName || "UserName"
            }

            await setDoc(senderRef,chatObjSender);            
            await setDoc(recieverRef, chatObjReciever);
            console.log("chat has been posted")

            await setDoc(doc(db, "messages", state.chatId ,"message", nanoid()),{
                sender: state.senderId,
                reciever: state.recieverId,
                messageContent: message,
                timeStamp:serverTimestamp()
            });        
            dispatch({ type: 'disableNewChat', payload: "" })

        } else {
            await setDoc(doc(db,"messages",state.chatId,"message",nanoid()),{
                sender: state.senderId,
                reciever: state.recieverId,
                messageContent: message,
                timeStamp:serverTimestamp()
            });
        }
    }
    
    return (
      <div ref={state.ref} className='w-full h-full flex flex-col'>
          <nav className='relative px-4 py-2 flex justify-between items-center z-20 bg-teal-900'>
              <div className='flex items-center'>
                  <img className='rounded-full w-12 mr-2' src={profileDefault} alt="" />
                        <div className='text-white text-lg'>{state.reciever}</div>
              </div>
              <TripleDot />
          </nav> 
            <div className='relative h-4/5 w-full bg-slate-800 flex flex-col-reverse gap-y-2 p-4 justify-start overflow-y-auto'>
                {
                    messageList&&
                    messageList.map((message: IMessages) => {
                        return message.sender === state.senderId ? <RightChatComponent key={nanoid()} messageContent={message.messageContent} /> : <LeftChatComponent key={nanoid()} messageContent={message.messageContent} />
                    })
                }
          </div>
          <form className='self-end w-full p-4 flex bg-teal-900'>
              <input onChange={messageSetter} type="text" placeholder='Type a message' name='message' value={message} className='p-2 w-full rounded-md outline-none text-white bg-slate-600' />
                    <button onClick={(e) => {
                        e.preventDefault()
                        uploadMsgToChat()
                        setMessage("")
                    }} className='m-2'><SubmitIcon /></button>
          </form>
      </div>
  )
}

export default ChatsDisplay;