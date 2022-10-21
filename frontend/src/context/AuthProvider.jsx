import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    const autentificarUsuario = async () => {
        /* Ira al checkAuth para validar esta info, si esta todo bien / comprobado nos manda una respuesta */
        let token = getToken();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios(`/users/profile`, config);
            setAuth(data)
        } catch (error) {
            setAuth({})
        } finally {
            setLoading(false)
        }

    }

    /* Comprobamos si hay un token, si hay va a intentar enviarlo hacia la API e intentar autentificar al usuario */
    useEffect(() => {
        autentificarUsuario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getToken() {
        const token = localStorage.getItem('token')

        if (!token) {
            setLoading(false)
            return
        }
        return token;
    }

    //TODO: Pasar la ruta por parametros, crear las demas funciones
    const signInWithEmailAndPassword = async (email, password) => {
        const { data } = await clienteAxios.post(`/users/login`, { email, password })
        localStorage.setItem('token', data.token);
        setAuth(data);
        await autentificarUsuario();
    }

    const register = async (name, lastname, email, password) => {
        const { data } = await clienteAxios.post(`/users/signin`,
            { name, lastname, email, password })
        console.log(data)
        return data;
    }

    const resetPassword = async (email) => {
        const { data } = await clienteAxios.post(
            `/users/reset-password`, { email })
        return data;
    }

    const confirmAccount = async (id) => {
        const { data } = await clienteAxios(`/users/confirm/${id}`);
        return data;
    }

    const checkTokenByParameters = async (token) => {
        const { data } = await clienteAxios(`/users/reset-password/${token}`)
        return data;
    }

    const newPassword = async (token, password) => {
        const { data } = await clienteAxios.post(`/users/reset-password/${token}`, { password })
        return data;
    }

    const signOut = () => {
        setAuth({})
    }

    return <AuthContext.Provider value={{
        auth, checkTokenByParameters,
        confirmAccount, loading, newPassword,
        register, resetPassword,
        signInWithEmailAndPassword, signOut
    }}>
        {children}
    </AuthContext.Provider>
}

export {
    AuthProvider
}

export default AuthContext;