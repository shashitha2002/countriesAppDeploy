import React, { useState } from "react";
import { Button, Box, VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = async () => {
    try {
      if (!email || !password || !confirmedPassword) {
        enqueueSnackbar("Please fill in all fields", {
          variant: "error",
          autoHideDuration: 5000,
        });
        return 0;
      }

      if (password !== confirmedPassword) {
        setPassword("");
        setConfirmedPassword("");
        enqueueSnackbar("Passwords do not match", {
          variant: "error",
          autoHideDuration: 5000,
        });
        return 0;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      enqueueSnackbar("You signed up successfully", {
        variant: "success",
        autoHideDuration: 5000,
      });
      setUser(userCredential.user);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      let Error = "";

      switch (error.code) {
        case "auth/invalid-email":
          Error = "Please enter a valid email address";
          break;
        case "auth/user-not-found":
          Error = "No account found with this email";

          break;
        case "auth/wrong-password":
          Error = "Incorrect password";

          break;
        case "auth/too-many-requests":
          Error = "Account temporarily locked due to many failed attempts";

          break;
        case "auth/user-disabled":
          Error = "This account has been disabled";
          break;
        case "auth/invalid-credential":
          Error = "Invalid credentials provided";
          break;
      }

      enqueueSnackbar(Error, {
        variant: "error",
        autoHideDuration: 5000,
      });
    }
  };

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
          <Input
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
          <Button
            colorScheme="blue"
            width="100%"
            onClick={() => handleSignUp()}
          >
            sign-up
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignUp;
