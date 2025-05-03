import React from 'react'
import { Spinner } from "@chakra-ui/react"
const Loader = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                size='xl'
                color='green.500'
            />
        </div>
    )
}
export default Loader
