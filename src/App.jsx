import React from 'react'
import './App.css'
import Form from './components/Form'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Generate from './components/Generate'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Form />} />
      <Route path='/generate' element={<Generate />} />
    </Routes>
      

    </BrowserRouter>
  )
}

export default App