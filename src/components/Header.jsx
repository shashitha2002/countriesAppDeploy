import React, { useState } from "react";
import {
  Box,
  Image,
  Portal,
  Menu,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import myImage from "../../public/logoipsum-custom-logo.svg";
import axios from "axios";
import { useCountryStore } from "../store/useCountryStore.js";
import { useUserStore } from "../store/useUserStore.js";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router';

const Header = (props) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const { user,logout } = useUserStore();

  const { setCountries } = useCountryStore();

  const navigate = useNavigate();

  const setRegion = async (region) => {
    try {
      if (selectedRegion !== region) {
        setSelectedRegion(region);
      }

      if (selectedLanguage !== null) {
        setSelectedLanguage(null);
      }

      const response = await axios.get(
        `https://restcountries.com/v3.1/region/${region}`
      );
      setCountries(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const setLanguage = async (language) => {
    try {
      if (selectedLanguage !== language) {
        setSelectedLanguage(language);
      }

      if (selectedRegion !== null) {
        setSelectedRegion(null);
      }

      const response = await axios.get(
        `https://restcountries.com/v3.1/lang/${language}`
      );
      setCountries(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      localStorage.removeItem("isAuthenticated");
      logout();
      navigate('/')  
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height={{ base: "70px", md: "90px" }}
      backgroundColor="white"
      color="black"
      px={{ base: 2, md: 4 }}
      flexWrap="wrap"
      gap={2}
    >
      <Box display="flex" alignItems="center" pl={{ base: 1, md: 3 }} gap={{ base: 2, md: 4 }}>
        <Image src={myImage} height={{ base: "40px", md: "60px" }} />
        {user?.email && (
          <Box textAlign="left">
            <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
              Signed in as
            </Text>
            <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
              {user.email}
            </Text>
          </Box>
        )}
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 2, md: 4 }}
        pr={{ base: 1, md: 3 }}
        width={{ base: "100%", md: "auto" }}
        alignItems={{ base: "flex-end", md: "center" }}
      >
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              variant="outline"
              size={{ base: "sm", md: "lg" }}
              colorPalette="green"
              width={{ base: "100%", md: "auto" }}
            >
              {selectedRegion === null ? "Region" : selectedRegion}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {props.regions.map((region, index) => (
                  <Menu.Item key={index} onClick={() => setRegion(region)}>
                    {region}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              variant="outline"
              size={{ base: "sm", md: "lg" }}
              colorPalette="green"
              width={{ base: "100%", md: "auto" }}
            >
              {selectedLanguage === null ? "Language" : selectedLanguage}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {props.languages.map((language, index) => (
                  <Menu.Item key={index} onClick={() => setLanguage(language)}>
                    {language}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        <Button
          variant="outline"
          size={{ base: "sm", md: "lg" }}
          colorPalette="green"
          width={{ base: "100%", md: "auto" }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Stack>
    </Box>
  );
};
export default Header;
