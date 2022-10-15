import React from 'react'
import { Outlet } from 'react-router-dom' /* info:https://reactrouter.com/en/main/components/outlet */

const AuthLayout = () => {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default AuthLayout
