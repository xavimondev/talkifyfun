import { Flex } from '@chakra-ui/react'

import Header from 'components/Header'

type Props = {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <Header title='Dashboard' content='Welcome to Dashboard' />
      <Flex
        m={8}
        height='100vh'
        direction={{
          base: 'column',
          lg: 'row',
          xl: 'row',
          '2xl': 'row'
        }}
        gap={6}
      >
        {children}
      </Flex>
    </>
  )
}

export default Layout
