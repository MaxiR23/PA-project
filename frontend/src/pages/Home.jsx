import React from 'react'
import useAuth from '../hooks/useAuth'

export default function Home() {

  const { signOut } = useAuth()

  const handleOnClick = () => {
    signOut();
    localStorage.removeItem('token')
    console.log('salio')
  }
  
  return (
    <div>
      <p> Hola, bienvenido </p>
      <button onClick={handleOnClick}> Salir </button>
    </div>
  )
}
