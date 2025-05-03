import React from 'react'
import { Text, Separator, Stack } from "@chakra-ui/react";

const LocationNGovernment = (props) => {
  const coatOfArms = props.country.coatOfArms;
  return (
    <Stack>
      <div className='flex justify-center'>
      {coatOfArms && coatOfArms.png ? (
        <img src={coatOfArms.png} alt="coatOfArms" width={200} height={200} />
      ) : (
        "No Coat of Arms Available"
      )}

    </div>
            <Text p={3}>
              <b>Region :</b> {props.country.region}
            </Text>
            <Separator />
            <Text p={3}>
              <b>Subregion :</b> {props.country.subregion}
            </Text>
            <Separator />
            <Text p={3}>
              <b>latlng:</b>{" "}
              {props.country.latlng}
            </Text>
            <Separator />      
            <Text p={3}>
              <b>borders :</b> {props.country.borders?.join(", ")}
            </Text>
            <Separator />
            <Text p={3}>
              <b>Alternative Spellings :</b> {props.country.altSpellings?.join(", ")}
            </Text>
            <Separator />
          </Stack>
  )
}

export default LocationNGovernment