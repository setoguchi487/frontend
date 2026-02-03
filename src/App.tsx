import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SighIn from './pages/SignIn';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<SighIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
