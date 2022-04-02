import { useEffect, useState } from 'react';
import './App.css'
import ChatContainer from './Components/ChatContainer/ChatContainer';
import ChatsDisplay from './Components/ChatsDisplay/ChatsDisplay';
import useUsersFromDatabase from './Hooks/useUsersFromDatabase';
import AuthenticationPage from './Pages/AuthenticationPage';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './Hooks/useAuth';
// import { getSingleUser } from './api/getUserData';
import { useTopLevelContext } from './Hooks/useContextProvider';
import FrontPanel from './Components/FrontPanel/FrontPanel';

const App = () => {

  const [showPanel, setShowPanel] = useState<boolean>(true)
  const users = useUsersFromDatabase()
  const { user } = useAuth()
  const {state,dispatch} = useTopLevelContext()
  
  console.log(state)
  console.log(user)
  console.log(users)
  
  const togglePanel = ():void => {
    setShowPanel(false)
  }

  const setSenderId = async () => {
      // const userData = await getSingleUser(user.uid)
      dispatch({type:"setSender",payload:user.uid})
  }

  useEffect(() => {
    if (user.isLoggedIn) {
      setSenderId()
    }

  },[user])
  
  return (
      <main className='flex items-center justify-center h-screen'>
        <Routes>
            <Route path="/" element={
                <div className='flex w-[1400px] bg-teal-900 app-full-height rounded-sm'>
                  <ChatContainer users = {users} togglePanel={togglePanel} />
                  {showPanel ? <FrontPanel /> : <ChatsDisplay />}
                </div>
              } />
              <Route path="/auth" element={<AuthenticationPage />} />
        </Routes>
      </main>
  );
}

export default App;
