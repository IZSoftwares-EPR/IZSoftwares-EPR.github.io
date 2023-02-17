import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthContext, authState} from "./context/auth-context"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext.Provider value={authState}>
      <App />
    </AuthContext.Provider>
  </React.StrictMode>
);
