import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    Link,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

import { Link as ReactLink } from 'react-router-dom';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import CustomAlert from '../components/CustomAlert';
import useAuth from '../hooks/useAuth';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [alert, setAlert] = useState({})

    const { register } = useAuth();

    const handleSubmit = async () => {
        if ([name, lastname, email, password, repeatPassword].includes('')) {
            setAlert({
                msg: 'Campos obligatorios',
                error: true
            })
            return;
        }

        try {
            const data = await register(name, lastname, email, password);
            setAlert({ msg: data.msg, error: false })

            setName('')
            setLastname('')
            setEmail('')
            setPassword('')
            setRepeatPassword('')

        } catch (error) {
            //MAS INFO Acerca de error.response: https://axios-http.com/es/docs/handling_errors
            setAlert({ msg: error.response.data.msg, error: true })
        }
    }

    const { msg } = alert;

    return (
        <>
            {msg && <CustomAlert alert={alert} />} {/* pero cuando exista mostrará el custom alert */}

            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Registrate
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            para disfrutar todas las funcionalidades
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>Nombre</FormLabel>
                                        <Input type="text" value={name} onChange={e => setName(e.target.value)} />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName" isRequired>
                                        <FormLabel>Apellido</FormLabel>
                                        <Input type="text" value={lastname} onChange={e => setLastname(e.target.value)} />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Correo electrónico</FormLabel>
                                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Contraseña</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="repeat-password" isRequired>
                                <FormLabel>Repetir contraseña</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    onClick={handleSubmit}
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Registrate
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Ya tenes una cuenta? <Link as={ReactLink} to={'/'} color={'blue.400'}>Iniciar sesión</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}