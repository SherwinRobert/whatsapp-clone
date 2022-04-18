import { useEffect} from 'react';
import './App.css'
import ChatContainer from './Components/ChatContainer/ChatContainer';
import ChatsDisplay from './Components/ChatsDisplay/ChatsDisplay';
import useUsersFromDatabase from './Hooks/useUsersFromDatabase';
// import AuthenticationPage from './Pages/AuthenticationPage';
import GuestUsersPage from './Pages/guestUsersPage';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './Hooks/useAuth';
import { useTopLevelContext } from './Hooks/useContextProvider';
import FrontPanel from './Components/FrontPanel/FrontPanel';
import { getSingleUser } from './api/getUserData'

const App = () => {
  const users = useUsersFromDatabase()
  const { user } = useAuth()
  const {state,dispatch} = useTopLevelContext()
  
  console.log(state)
  console.log(user)

  // useEffect(() => {
  //   if (user.isLoggedIn) {
  //     dispatch({type:"setSender",payload:user.uid})
  //   }

  // }, [user])
  
  const getUserName = async(id:string) => {
      let user = await getSingleUser(id)
      dispatch({type:"setUserName",payload:user.name})
  }

  useEffect(() => {
        getUserName(state.senderId)
    },[state.senderId])
  
  return (
      <main className='flex items-center justify-center h-screen'>
      <Routes>
            <Route path="/" element={<GuestUsersPage />} />
            <Route path="/:id" element={
                <div className='flex w-[1400px] bg-teal-900 app-full-height rounded-sm'>
                  <ChatContainer users = {users} />
                  {state.showPanel ? <FrontPanel /> : <ChatsDisplay />}
                </div>
              } />
              <Route path="/auth" element={<GuestUsersPage />} />
        </Routes>
      </main>
  );
}

export default App;
