import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SighIn from './pages/SignIn';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import UserProfile from './pages/UserProfile';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<SighIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="/account" element={<Account />} />
          <Route path="/users/:id" element={<UserProfile />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
