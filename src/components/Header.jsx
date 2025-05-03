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
      height="90px"
      backgroundColor="white"
      color="black"
    >
      <Box display="flex" alignItems="center" pl="3" gap="3">
        <Image src={myImage} height="60px" />
        {user?.email && (
          <Box textAlign="left">
            <Text fontSize="sm" color="gray.500">
              Signed in as
            </Text>
            <Text fontWeight="bold">{user.email}</Text>
          </Box>
        )}
      </Box>

      <Stack direction="row" spacing={4} pr="3">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="outline" size="lg" colorPalette="green">
              {selectedRegion === null ? "region" : selectedRegion}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {props.regions.map((region, index) => (
                  <Menu.Item
                    key={index}
                    onClick={() => {
                      setRegion(region);
                    }}
                  >
                    {region}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="outline" size="lg" colorPalette="green">
              {selectedLanguage === null ? "Language" : selectedLanguage}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {props.languages.map((language, index) => (
                  <Menu.Item
                    key={index}
                    onClick={() => {
                      setLanguage(language);
                    }}
                  >
                    {language}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        <Button variant="outline" size="lg" colorPalette="green" onClick={handleLogout}>
          Log Out
        </Button>
      </Stack>
    </Box>
  );
};
export default Header;
