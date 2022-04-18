import { nanoid } from "nanoid";
import BackArrowIcon from "../../Icon/BackArrowIcon";
import { IUsers } from "../../Interfaces/Interfaces";
import UserInfoComponent from "../UserInfoComponent/UserInfoComponent";
import {useTopLevelContext} from '../../Hooks/useContextProvider'
import { useAuth } from "../../Hooks/useAuth";

interface IFindPeople{
  setShowFindPeople: (arg: boolean) => void,
  users: IUsers[]
}

const FindPeopleComponent = (props: IFindPeople) => {
  
  const {user} = useAuth()
  const {dispatch} = useTopLevelContext()

    const hideFindPeople = ():void => {
        props.setShowFindPeople(false)
  }

  const setRecieverName = (id:string) => {
    
    let recieverName = props.users.filter(user => {
      return user.id === id
    })
    dispatch({type:"setRecieverName",payload:recieverName[0].name || ""})
  }

  return (
    <div className="w-[400px] h-full relative z-20 bg-slate-800 border-r-[1px] border-r-gray-500">
      <nav className="flex items-center justify-between bg-teal-900 px-4">
        <div className="pt-12 pb-4 flex text-white">
          <button onClick={hideFindPeople} className="mr-2">
            <BackArrowIcon />
          </button>
          <div>New Chat</div>
        </div>
      </nav>
      <div className="p-2 border-b-[1px] border-b-gray-500">
        <input
          type="text"
          placeholder="Find People"
          className="text-white outline-none w-full bg-slate-600 p-2 rounded-md"
        />
      </div>

      <section className="overflow-y-scroll h-[78%] ">
        {
          props?.users?.filter(users => {
            return users.id !== user.uid
          })
            ?.map(user => {
            return <UserInfoComponent setRecieverName={setRecieverName}  key={nanoid()} {...user} />
          })
        }
      </section>
    </div>
  );
};

export default FindPeopleComponent;
