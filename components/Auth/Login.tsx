import { Button, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'

import { DiscordIc, GoogleIc } from 'components/Icons'
import { signInWithProvider } from 'services/auth'

const LoginWithProvider: React.FC = () => {
  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Stack spacing={4} w='full' maxW='md' rounded='xl' boxShadow='lg' p={6} bg='gray.900'>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: '2xl', md: '3xl' }}
          mb='2rem'
          color='white'
          fontWeight='semibold'
        >
          Welcome
        </Heading>
        <Button
          w='full'
          bg='gray.700'
          leftIcon={<DiscordIc />}
          _hover={{ bg: 'gray.700' }}
          onClick={() => signInWithProvider('discord')}
        >
          <Center>
            <Text>Log in with Discord</Text>
          </Center>
        </Button>
        <Button
          w='full'
          bg='gray.700'
          leftIcon={<GoogleIc />}
          _hover={{ bg: 'gray.700' }}
          onClick={() => signInWithProvider('google')}
        >
          <Center>
            <Text>Log in with Google</Text>
          </Center>
        </Button>
      </Stack>
    </Flex>
  )
}

export default LoginWithProvider
