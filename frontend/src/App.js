import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import Confirmaccount from './pages/Confirmaccount';
import { ChakraProvider } from '@chakra-ui/react'

const { REACT_APP_BACKEND_URL } = process.env;

console.log(REACT_APP_BACKEND_URL)

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />}></Route> {/* index indica cual elemento se va a cargar al ir a la path='/' */}
            <Route path='register' element={<Register />}></Route> {/* ya no nos hace falta ponerle /register porq ya lo hereda del path principal */}
            <Route path='reset-password' element={<ResetPassword />}></Route>
            <Route path='reset-password/:token' element={<NewPassword />}></Route>
            <Route path='confirm/:id' element={<Confirmaccount />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
