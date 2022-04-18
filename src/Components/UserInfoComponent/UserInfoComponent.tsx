import profileDefault from '../../Images/profileDefault.png'
import { IUsers } from '../../Interfaces/Interfaces';
import { useTopLevelContext } from '../../Hooks/useContextProvider';
import { nanoid } from 'nanoid'
import { query, collection, where, getDocs } from 'firebase/firestore';
import db from '../../firebase-config'

interface IUserInfo extends IUsers{
  setRecieverName: (arg:string) => void
}

interface IChatData{
  chatId: string,
  reciever:string
}

const UserInfoComponent = (props: IUserInfo) => {
  
  const { dispatch, state } = useTopLevelContext()
  
  const recieverIdSetter = (id:string,chatId:string) => {
    dispatch({ type: "setReciever", payload: id })
    dispatch({ type: "setChat", payload: chatId })
  }

  const newChatChecker = async (id: string) => {
    let chatData:IChatData = {} as IChatData
    const q = query(collection(db, "chats",state.senderId,"chatIds"), where('reciever', '==', id))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "Output => ", doc.data());
      chatData = doc.data() as IChatData
    });

    if (chatData.chatId) {
      recieverIdSetter(id, chatData!.chatId)
    } else {
      recieverIdSetter(id, nanoid())
      dispatch({ type: 'setNewChat', payload: "" })
    }
  }

  return (
    <div onClick={() => {
      dispatch({type: 'togglePanel',payload:""})
      props.setRecieverName(props?.id)
      newChatChecker(props?.id)
      console.log("the width is",state.ref?.current)
    }} className="p-2 flex items-center relative cursor-pointer bg-slate-800 active:bg-slate-500">
      <img className='rounded-full w-12 h-12 mr-2' src={profileDefault} alt="" />
      <div className='w-5/6 border-b-[1px] py-2 border-b-gray-500'>
            <div className='text-white'>{props.name}</div>
        <div className="text-gray-400 truncate">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi</div>
      </div>
    </div>
  )
}

export default UserInfoComponent;
