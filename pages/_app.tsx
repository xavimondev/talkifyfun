import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from 'config/ui'
import { RoomProvider } from 'context/RoomContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RoomProvider>
        <Component {...pageProps} />
      </RoomProvider>
    </ChakraProvider>
  )
}

export default MyApp
