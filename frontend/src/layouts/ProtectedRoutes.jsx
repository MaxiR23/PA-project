import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/Header';
import useAuth from '../hooks/useAuth'

export default function ProtectedRoutes() {

    const { auth, loading } = useAuth();

    if (loading) return 'loading...'

    //Si el usuario esta autenticado va a cargar las paginas que contiene Outlet , en caso de que no este logeado irá al inicio de sesión
    return (
        <>
            {auth.id 
            ?
                <>
                <Header/>
                <Outlet />
                </>
                :
                <Navigate to='/' />}
        </>
    )
}
