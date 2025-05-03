import React from 'react';
import { Button, Box, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      bgImage="url('/CountryBG.jpg')" // Replace with your preferred background
      bgSize="cover"
      bgPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        p={8}
        rounded="2xl"
        shadow="xl"
        width="90%"
        maxW="400px"
        textAlign="center"
      >
        <VStack spacing={4}>
          <Button colorScheme="blue" width="100%" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button colorScheme="teal" width="100%" onClick={() => navigate('/signUp')}>
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
