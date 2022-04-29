import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from 'config/ui'
import { RoomProvider } from 'context/RoomContext'
import { VideoProvider } from 'context/VideoContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RoomProvider>
        <VideoProvider>
          <Component {...pageProps} />
        </VideoProvider>
      </RoomProvider>
    </ChakraProvider>
  )
}

export default MyApp
