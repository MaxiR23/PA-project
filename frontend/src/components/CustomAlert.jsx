import React from 'react';
import { Container, Text } from '@chakra-ui/react'

const CustomAlert = ({ alert }) => {

    const showAlert = () => {
        if (alert.error) {
            return <Container style={{
                backgroundColor: 'red',
            }}>
                <Text fontSize={'xl'} textAlign={'center'} textColor={'white'} padding={'6px'}> {alert.msg} </Text>
            </Container>
        } else {
            return <Container style={{
                backgroundColor: 'blue',
            }}>
                <Text fontSize={'xl'} textAlign={'center'} textColor={'white'} padding={'6px'}> {alert.msg} </Text>
            </Container>
        }
    }

    return (
        <>
            {showAlert()}
        </>
    )
}

export default CustomAlert;
