import { useState } from 'react'
import './App.css'
import { All_Router } from './Routers/All_Router'
import { Navbar } from './Components/HomePage/Navbar'
import Footer from './Components/HomePage/Footer'

function App() {
  return (
    <>
      <Navbar/>
      <All_Router/>
      <Footer/>
    </>
  )
}

export default App
