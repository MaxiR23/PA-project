import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/Header';
import useAuth from '../hooks/useAuth'
import { CircularProgress, Container } from '@chakra-ui/react';

export default function ProtectedRoutes() {

    const { auth, loading } = useAuth();

    if (loading) return <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress isIndeterminate size='80px' thickness='4px' />
    </Container>

    //Si el usuario esta autenticado va a cargar las paginas que contiene Outlet , en caso de que no este logeado irá al inicio de sesión
    return (
        <>
            {auth.id
                ? (
                    <>
                        <Header />
                        <Outlet />
                    </>
                )
                :
                <Navigate to='/' />}
        </>
    )
}
