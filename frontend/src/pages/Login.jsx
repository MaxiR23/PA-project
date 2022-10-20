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

export default function SimpleCard() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})

    const { loginConEmailyPassword } = useAuth();

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
            await loginConEmailyPassword(email, password);
            setAlert({})
        } catch (error) {

            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    return (
        <>
            {alert && <CustomAlert msg={alert.msg} error={alert.error} />}
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
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
                                    <Checkbox>Remember me</Checkbox>
                                    <Link as={ReactLink} to={'reset-password'} color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    onClick={handleSubmit}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
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
