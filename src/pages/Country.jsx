import { Box, Image, Heading, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LuSquareCheck } from "react-icons/lu";
import Loader from "../components/ui/loader.jsx";
import GeneralInfo from "./GeneralInfo.jsx";
import LocationNGovernment from "./Location&Government.jsx";
import TranslationsNMisc from "./Translations&Misc.jsx";
import { MdContentPasteSearch } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";

const Country = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchCountry = async () => {
        setLoading(true);
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${id}`
        );
        const data = await response.json();
        setCountry(data[0]);
        setLoading(false);
        console.log(data);
      };
      fetchCountry();
      
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Heading textAlign="center" size="4xl" mt={5} fontFamily="mono" fontStyle="bold">
            {country.name?.common}
          </Heading>

          {country && (
            <>
              <Box display="flex" justifyContent="center" p={4}>
                <Image
                  rounded="md"
                  h="400px"
                  w="500px"
                  objectFit="contain"
                  src={country.flags?.png}
                  alt={`Flag of ${country.name?.common}`}
                />
              </Box>

              <Tabs.Root defaultValue="General Info">
                <Tabs.List>
                  <Tabs.Trigger value="General Info">
                  <MdContentPasteSearch />
                    General Info
                  </Tabs.Trigger>
                  <Tabs.Trigger value="Location & Government">
                  <FaMapLocationDot />
                    Location & Government
                  </Tabs.Trigger>
                  <Tabs.Trigger value="Translations & Misc">
                    <LuSquareCheck />
                    Translations
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="General Info">
                  
                  <GeneralInfo country={country} />
                </Tabs.Content>
                <Tabs.Content value="Location & Government">
                  <LocationNGovernment country={country}/>
                </Tabs.Content>
                <Tabs.Content value="Translations & Misc">
                  <TranslationsNMisc country={country}/>
                </Tabs.Content>
              </Tabs.Root>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Country;
