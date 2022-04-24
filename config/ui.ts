import { Styles, mode } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const styles: Styles = {
  global: (props) => ({
    body: {
      color: mode('gray.500', 'white')(props),
      bg: mode('white', '#111111')(props)
    }
  })
}

export const theme = extendTheme({ config, styles })
