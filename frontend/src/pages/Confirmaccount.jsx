/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CustomAlert from '../components/CustomAlert';
import useAuth from '../hooks/useAuth';

export default function ConfirmAccoun(): JSX.Element {

  const [alert, setAlert] = useState({});
  //Vemos los parametros que le estamos pasando por url / parametros
  const params = useParams();
  /* extramos el id de params ejecutando un destructuring */
  const { id } = params;

  const { confirmAccount } = useAuth();

  /* requerimos el useEffect con el arreglo vacio [] para que se ejecute una sola vez.
  Al ser una variable estatica {token} pasada por url y no requerir de ninguna acción del usuario como para pasarle una dependencia */
  useEffect(() => {
    const confirmAcc = async () => {
      try {
        /* axios tiene el GET por default */
        const data = await confirmAccount(id);
        setAlert({
          msg: data.msg,
          error: false
        })

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    confirmAcc();
  }, [])

  const { msg } = alert;

  return (
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
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Confirma tu cuenta
          </Heading>
        </Stack>
      </Flex>

      <Container>
        {msg && <CustomAlert alert={alert} />}
      </Container>

      {/* TODO: CREAR UN LINK QUE MANDE A INICIO DE SESIÓN CON LINK O MANDARLO CON UN TIMEOUT Y USENAVIGATE */}
    </>
  );
}