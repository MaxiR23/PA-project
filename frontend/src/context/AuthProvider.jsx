import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const autentificarUsuario = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            setLoading(false)
            return
        }

        /* Ira al checkAuth para validar esta info, si esta todo bien / comprobado nos manda una respuesta */
        //TODO: encapsular token.
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios(`/users/profile`, config);
            setAuth(data)
            navigate('/home')
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

    //TODO: Pasar la ruta por parametros, crear las demas funciones
    const loginConEmailyPassword = async (email, password) => {
        const {data} = await clienteAxios.post(`/users/login`, { email, password })
        localStorage.setItem('token', data.token);
        setAuth(data);
        await autentificarUsuario();
    }

    const signOut = () => {
        setAuth({})
    }

    return <AuthContext.Provider value={{ auth, loading, loginConEmailyPassword, signOut }}>
        {children}
    </AuthContext.Provider>
}

export {
    AuthProvider
}

export default AuthContext;