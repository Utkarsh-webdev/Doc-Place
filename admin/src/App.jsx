import React, { useContext } from 'react'
import Login from './pages/Login'
import { AdminContext } from './context/AdminContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const { aToken } = useContext(AdminContext)

  return aToken ? (
    <div>
      <ToastContainer />
      <h1>Dashboard</h1>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App