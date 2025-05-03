import React, { useEffect, useState } from "react";
import { Stack, Box, Input, HStack, Button } from "@chakra-ui/react";
import axios from "axios";
import Loader from "../components/ui/loader.jsx";
import Header from "../components/Header.jsx";
import CountryCard from "../components/CountryCard.jsx";
import { useCountryStore } from "../store/useCountryStore.js";
import { FaSearchLocation } from "react-icons/fa";

export const AllCountries = () => {
  const { countries, setCountries } = useCountryStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [regions, setRegions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);

      const fetchCountries = axios.get("https://restcountries.com/v3.1/all");
      fetchCountries
        .then((response) => {
          setCountries(response.data);
          console.log(response.data);

          const allRegions = response.data
            .map((country) => country.region)
            .filter((region) => region);

          const uniqueRegions = [...new Set(allRegions)];
          setRegions(uniqueRegions);

          const allLanguages = response.data
            .flatMap((country) =>
              country.languages ? Object.values(country.languages) : []
            )
            .filter((lang) => lang);

          const uniqueLanguages = [...new Set(allLanguages)];
          setLanguages(uniqueLanguages);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  }, [setCountries]);

  const fetchCountries = async (name) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );

      if (!response.ok) {
        throw new Error("Country not found");
      }

      const data = await response.json();
      setCountries(data);
    } catch (err) {
      console.error(err);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header regions={regions} languages={languages} />

      <HStack spacing={4} p={4} bg="white" alignItems="center">
        <Box px={4} py={2} w="100%" bg="white">
          <Input
            placeholder="Search The Country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="lg"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchCountries(searchTerm);
              }
            }}
          />
        </Box>
        <Button
          px={4}
          py={2}
          bg="#1CA03D"
          borderRadius="md"
          boxShadow="md"
          _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
          transition="all 0.2s"

          onClick={() => fetchCountries(searchTerm)}
        >
          <FaSearchLocation size={24} color="white" />
        </Button>
      </HStack>

      <Stack spacing={4} p={4}>
        {loading ? <Loader /> : <CountryCard countries={countries} />}
      </Stack>
    </>
  );
};
