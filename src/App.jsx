import React, { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import CreateUser from './components/CreateUser'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UsersList from './components/UsersList'
import UpdateUser from './components/UpdateUser'

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<CreateUser />} />
          <Route path='/read' element={<UsersList />} />
          <Route path='/edit/:id' element={<UpdateUser />} />

        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
