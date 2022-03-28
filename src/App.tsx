import React, { useState } from 'react';
import './App.css'
import AuthProvider from './Context/AuthProvider';
import ChatContainer from './Components/ChatContainer/ChatContainer';
import ChatsDisplay from './Components/ChatsDisplay/ChatsDisplay';

const App = () => {

  const [showPanel, setShowPanel] = useState<boolean>(true)
  
  const togglePanel = () => {
    setShowPanel(false)
  }
  
  return (
    <main className='flex items-center justify-center h-screen'>
      <div className='flex w-[1400px] bg-teal-900 app-full-height rounded-sm'>
        <ChatContainer togglePanel={togglePanel} />
        <ChatsDisplay showPanel={showPanel}/>
      </div>
    </main>
  );
}

export default App;
