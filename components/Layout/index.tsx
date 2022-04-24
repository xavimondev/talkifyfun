import { Flex } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <Flex w='100vw' h='100vh' justifyContent='center' alignItems='center'>
        {children}
      </Flex>
    </>
  )
}

export default Layout
