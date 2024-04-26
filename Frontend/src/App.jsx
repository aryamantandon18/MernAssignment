import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Signup' element={<SignUp/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
