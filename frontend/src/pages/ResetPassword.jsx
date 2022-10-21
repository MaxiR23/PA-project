import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { useState } from 'react';
import CustomAlert from '../components/CustomAlert';
import useAuth from '../hooks/useAuth';

export default function ResetPassword(): JSX.Element {

  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({})

  const { resetPassword } = useAuth();

  async function handleSubmit() {
    //TODO: implementar una expresion regular para mejorar el control del email
    if (email === '' || email.length < 6) {
      setAlert({
        msg: 'Campo obligatorio, vacío',
        error: true
      })

      return;
    }

    try {
      const data = await resetPassword(email);
      setAlert({
        msg: data.msg,
        error: false,
      })

    } catch (error) {
      console.warn(error.respose)
      setAlert({
        msg: error.respose.data.msg,
        error: true
      })
    }

  }

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
          {msg && <CustomAlert alert={alert} />}
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Olvidaste tu contraseña?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            Recibirás un correo electrónico con los pasos a seguir para restablecer contraseña
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} /* conforme vaya escribiendo el usuario se va a ir seteando en el state */
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              onClick={handleSubmit}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Solicitar nueva contraseña
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}