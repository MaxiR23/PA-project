import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    /* Comprobamos si hay un token, si hay va a intentar enviarlo hacia la API e intentar autentificar al usuario */
    useEffect(() => {
        const autentificarUsuario = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                setLoading(false)
                return
            }

            /* Ira al checkAuth para validar esta info, si esta todo bien / comprobado nos manda una respuesta */
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

        autentificarUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <AuthContext.Provider value={{ auth, loading, setAuth }}>
        {children}
    </AuthContext.Provider>
}

export {
    AuthProvider
}

export default AuthContext;