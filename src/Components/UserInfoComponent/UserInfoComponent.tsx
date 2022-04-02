import profileDefault from '../../Images/profileDefault.png'
import { IUsers } from '../../Interfaces/Interfaces';
import { useTopLevelContext } from '../../Hooks/useContextProvider';
import { nanoid } from 'nanoid'

interface IUserInfo extends IUsers{
  togglePanel: () => void,
  setRecieverName: (arg:string) => void
}

const UserInfoComponent = (props: IUserInfo) => {
  
  const { dispatch } = useTopLevelContext()
  
  const recieverIdSetter = (id:string) => {
    dispatch({ type: "setReciever", payload: id })
    dispatch({type : "setNewChat" ,payload: nanoid()})
  }

  return (
    <div onClick={() => {
      recieverIdSetter(props?.id)
      props.togglePanel()
      props.setRecieverName(props?.id)
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