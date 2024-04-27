import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import store from './store'
import { loadUser } from './actions/userActions'
import Images from './components/Images'
import { Toaster } from 'react-hot-toast'

function App() {

  useEffect(()=>{
   store.dispatch(loadUser());
  },[])

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Signup' element={<SignUp/>}/>
        <Route path='/images' element={<Images/>} />
      </Routes>
      <Toaster/>
    </Router>
    </>
  )
}

export default App
