import { useTopLevelContext } from '../../Hooks/useContextProvider'
import profileDefault from '../../Images/profileDefault.png'

interface IChat{
  chatId: string,
  reciever: string,
  sender:string
}

interface IChatFrontComponent{
  togglePanel: () => void
  user: IChat
}


const ChatFrontComponent = ({ togglePanel, user }: IChatFrontComponent) => {
  
  const { dispatch, state } = useTopLevelContext()
  
  const chatOpener = (id:string,recieverId:string) => {
    togglePanel()
    dispatch({ type: 'setNewChat', payload: id })
    dispatch({type :'setReciever',payload:recieverId})
}
  return (
    <div onClick={()=> chatOpener(user.chatId,state.senderId === user.sender ? user.reciever : user.sender)} className="p-2 flex items-center relative cursor-pointer active:bg-slate-500">
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