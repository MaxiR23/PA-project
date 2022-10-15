import {
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

export default function ConfirmAccoun(): JSX.Element {
  return (
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
  );
}