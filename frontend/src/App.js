import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import Confirmaccount from './pages/Confirmaccount';
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthProvider';
import Home from './pages/Home'
import ProtectedRoutes from './layouts/ProtectedRoutes'

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />}></Route> {/* index indica cual elemento se va a cargar al ir a la path='/' */}
              <Route path='register' element={<Register />}></Route> {/* ya no nos hace falta ponerle /register porq ya lo hereda del path principal */}
              <Route path='reset-password' element={<ResetPassword />}></Route>
              <Route path='reset-password/:token' element={<NewPassword />}></Route>
              <Route path='confirm/:id' element={<Confirmaccount />}></Route>
            </Route>

            {/* Si un usuario no esta autentificado no podrá acceder al resto de componentes */}
            <Route path='/home' element={<ProtectedRoutes/>}>
              <Route index element={<Home/>} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
