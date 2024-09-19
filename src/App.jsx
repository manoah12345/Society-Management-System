import React from 'react'
import System from './components/System'
import { Auth } from './components/auth'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Signup } from './components/signup';

function App() {
  return (
    <div className='w-full h-full'>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<System />} />
        </Routes>
        </div>
  ) 
}

export default App