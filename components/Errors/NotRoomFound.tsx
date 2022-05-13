import { Flex, Heading, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

import Header from 'components/Header'

type Props = {
  roomId: string
}
const NotRoomFound = ({ roomId }: Props) => {
  return (
    <>
      <Header
        title={`Room with ID: ${roomId} not found`}
        content={`Please check the name and try again`}
      />
      <Flex minH='100vh' align='center' justify='center' direction='column' gap={10}>
        <Heading fontSize='5xl'>Room with ID: {roomId} not found</Heading>
        <NextLink href='/home' passHref>
          <Link
            borderRadius='md'
            padding={2}
            variant='solid'
            fontSize='xl'
            fontWeight='semibold'
            bg='red.600'
            _hover={{ bg: 'red.500' }}
          >
            Go Home
          </Link>
        </NextLink>
      </Flex>
    </>
  )
}

export default NotRoomFound
