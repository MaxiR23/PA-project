import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

import { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function SimpleCard() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})

    const { signInWithEmailAndPassword } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit() {
        //TODO: usar trim()
        if ([email, password].includes('')) {
            setAlert({
                msg: 'Campos obligatorios',
                error: true
            })
            return
        }

        try {
            await signInWithEmailAndPassword(email, password);
            setAlert({})
            navigate('/home')
        } catch (error) {

            setAlert({
                msg: error.response.data.msg,
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
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Ingresa a tu cuenta</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Para disfrutar todas nuestras <Link color={'blue.400'}>functiones</Link> ✌️
                        </Text>
                    </Stack>

                    {msg && <CustomAlert alert={alert} />}

                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Correo electrónico</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Contraseña</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Recordame</Checkbox>
                                    <Link as={ReactLink} to={'reset-password'} color={'blue.400'}>Olvidaste la contraseña?</Link>
                                </Stack>
                                <Button
                                    onClick={handleSubmit}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Ingresar
                                </Button>

                                <Text textAlign={'center'} fontSize={'lg'} color={'gray.600'}>
                                    Ya tenes cuenta? <Link as={ReactLink} to={'register'} color={'blue.400'}>Registrate</Link>
                                </Text>

                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}
