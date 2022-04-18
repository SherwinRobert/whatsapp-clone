import { useTopLevelContext } from '../../Hooks/useContextProvider'
import profileDefault from '../../Images/profileDefault.png'

interface IChat{
  chatId: string,
  reciever: string,
  recieverName:string
}

interface IChatFrontComponent{
  user: IChat
}

const ChatFrontComponent = ({ user }: IChatFrontComponent) => {
  
  const { dispatch } = useTopLevelContext()
  
  const chatOpener = (id:string,recieverId:string,reciever:string) => {
    dispatch({type :'togglePanel',payload:""})
    dispatch({ type: 'setChat', payload: id })
    dispatch({ type: 'setReciever', payload: recieverId })
    dispatch({ type:"setRecieverName",payload:reciever})
}
  return (
    <div onClick={()=> chatOpener(user.chatId,user.reciever,user.recieverName)} className="p-2 flex items-center relative cursor-pointer active:bg-slate-500">
      <img className='rounded-full w-12 h-12 mr-2' src={profileDefault} alt="" />
      <div className='w-5/6 border-b-[1px] py-2 border-b-gray-500'>
        <div className='flex justify-between'>
          <div className='text-white'>{ user?.recieverName || "UserName" }</div>
          <small className='text-gray-400'>7:37 AM</small>
        </div>
        <div className="text-gray-400 truncate">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi</div>
      </div>
    </div>
  )
}

export default ChatFrontComponent