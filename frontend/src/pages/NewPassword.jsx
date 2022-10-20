/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import clienteAxios from '../config/clienteAxios';

export default function NewPassword(): JSX.Element {

  const [alert, setAlert] = useState({})
  const [password, setPassword] = useState('');

  const params = useParams();
  const { token } = params;

  //TODO: SI EL TOKEN NO ES VALIDO, NO MOSTRAR EL FORM.
  /* Una vez que carga la página va a tomar los parametros que trae por URL. */
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        
        const { data } = await clienteAxios(`/users/reset-password/${token}`)

        setAlert({
          msg: data.msg,
          error: true,
        })

      } catch (error) {
        setAlert({
          msg: error.message.response.data.msg,
          error: true,
        })
      }
    }

    comprobarToken();
  }, [])

  async function handleSubmit(params) {
    if (password.length < 6) {
      setAlert({
        msg: 'La contraseña debe ser de mínimo 6 caracteres',
        error: true
      });
      return
    }

    try {
      const { data } = await clienteAxios.post(`/users/reset-password/${token}`, { password })
      console.log(data)
      setAlert({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      console.log(error)
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    //TODO: Redirigir al Login
    <>
      {alert && <CustomAlert msg={alert.msg} error={alert.error} />}

      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Enter new password
          </Heading>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input 
            type="password" 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}/>
          </FormControl>
          <Stack spacing={6}>
            <Button
            onClick={handleSubmit}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}