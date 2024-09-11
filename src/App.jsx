import React from 'react'
import System from './components/System'
import { Auth } from './components/auth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<System />} />
        </Routes>
  ) 
}

export default App