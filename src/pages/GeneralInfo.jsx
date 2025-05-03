import React from "react";
import { Text, Separator, Stack } from "@chakra-ui/react";

const GeneralInfo = (props) => {
  return (
    <div>
      <Text
        fontStyle="italic"
        textStyle="lg"
        p={2}
        fontSize="3xl"
        textAlign="center"
      >
        {props.country.name?.official}
      </Text>

      <Stack>
        <Text p={3}>
          <b>Capital :</b> {props.country.capital}
        </Text>
        <Separator />
        <Text p={3}>
          <b>Population :</b> {props.country.population}
        </Text>
        <Separator />
        <Text p={3}>
          <b>Currency:</b>{" "}
          {props.country.currencies
            ? Object.values(props.country.currencies)[0]?.name
            : "N/A"}
        </Text>
        <Separator />
        <Text p={3}>
          <b>Languages : </b>
          {props.country.languages
            ? Object.values(props.country.languages).join(", ")
            : "N/A"}
        </Text>
        <Separator />
        <Text p={3}>
          <b>Timezone :</b> {props.country.timezones?.join(", ")}
        </Text>
        <Separator />
        <Text p={3}>
          <b>Start of the week :</b> {props.country.startOfWeek}
        </Text>
        <Separator />
        <Text p={3}>
          <b>Top-level domain (TLD) :</b> {props.country.tld}
        </Text>
        <Separator />
        <Text p={3}>
          <b>Independent :</b> {props.country.Independent === true ? "Yes" : "No"}
        </Text>
        <Separator />
        <Text p={3}>
          <b>UN Member :</b> {props.country.unMember === true ? "Yes" : "No"}
        </Text>
        <Separator />
      </Stack>
    </div>
  );
};

export default GeneralInfo;
