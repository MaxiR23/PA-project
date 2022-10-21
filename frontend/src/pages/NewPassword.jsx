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
import { useParams, useNavigate } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import useAuth from '../hooks/useAuth';

export default function NewPassword(): JSX.Element {

  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState('');
  const { checkTokenByParameters, newPassword } = useAuth();

  const params = useParams();
  const navigate = useNavigate();

  const { token } = params;

  //TODO: SI EL TOKEN NO ES VALIDO, NO MOSTRAR EL FORM.
  /* Una vez que carga la página va a tomar los parametros que trae por URL. */
  useEffect(() => {
    const comprobarToken = async () => {
      try {

        const data = await checkTokenByParameters(token);

        setAlert({
          msg: data.msg,
          error: false,
        })

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        })
      }
    }

    comprobarToken();
  }, [])

  async function handleSubmit(params) {
    if (password.length <= 6) {
      setAlert({
        msg: 'La contraseña debe ser de mínimo 6 caracteres',
        error: true
      });
      return
    }

    try {
      /* Cambiamos la contraseña */
      const data = await newPassword(token, password)
      console.log(data)
      setAlert({
        msg: data.msg,
        error: false
      })

      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (error) {
      console.log(error)
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alert;

  return (
    //TODO: Redirigir al Login
    <>
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

          {msg && <CustomAlert alert={alert} />}
          
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Introducir nueva contraseña
          </Heading>
          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Stack spacing={6}>
            <Button
              onClick={handleSubmit}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Enviar
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}