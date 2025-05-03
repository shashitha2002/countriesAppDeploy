import React from 'react'
import { Box, Image, Text, SimpleGrid } from "@chakra-ui/react";
import { useCountryStore } from '../store/useCountryStore.js';
import { Link } from "react-router-dom";

const CountryCard = () => {

    const {
        countries,
    } = useCountryStore();

    return (
        <SimpleGrid columns={[1, 2, 3]} spacing={10} >
            {countries.map((country, index) => (
                <Link key={index} to={`/country/${country.cca2}`}>

                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    p={5}
                    mb={5}
                    bg="white"
                    maxW="md"

                    _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
                    transition="all 0.2s"

                >

                    <Box position="relative" w="100%" pt="56.25%">
                        <Image
                            src={country.flags.png}
                            alt={`Flag of ${country.name.common}`}
                            objectFit="cover"
                            position="absolute"
                            top="0"
                            left="0"
                            w="100%"
                            h="100%"
                            borderRadius="md"
                        />
                    </Box>

                    <Box mt={4}>
                        <Text fontSize="xl" fontWeight="bold">
                            {country.name.common}
                        </Text>
                        <Text fontSize="md">Region: {country.region}</Text>
                        <Text fontSize="md">
                            Population: {country.population.toLocaleString()}
                        </Text>
                    </Box>
                </Box>
                </Link>
            ))}
        </SimpleGrid>
    )
}
export default CountryCard
