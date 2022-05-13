import { Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

import Header from 'components/Header'

const NotPermission = () => {
  return (
    <>
      <Header title={`Something went wrong`} content={`Sorry you are not allowed to access`} />
      <Flex minH='100vh' align='center' justify='center' direction='column' gap={8}>
        <Text
          textAlign='center'
          fontSize={{
            base: 'md',
            md: '4xl'
          }}
        >
          You are not allowed to access this page because of permission or other reasons.
        </Text>
        <Text fontSize='2xl' fontWeight='semibold' textAlign='center'>
          Please check your devices 😢
        </Text>
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

export default NotPermission
