import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './Hooks/useAuth'
import ContextProvider from './Hooks/useContextProvider';

ReactDOM.render(
  
  <React.StrictMode>
    <ContextProvider>
      <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
     </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

