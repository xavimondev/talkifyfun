import { Avatar, Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'

import { LogoutIc } from 'components/Icons'

const Profile = () => {
  const bg = useColorModeValue('blue.400', '#181b29')
  return (
    <Box w='full' bg={bg} rounded='lg' p={6}>
      <Flex direction='column' w='100%' gap={4}>
        <Flex direction='row' alignItems='center' gap={4}>
          <Avatar size='xl' name='Xavi Alfaro' src='' />
          <Flex direction='column' gap={2}>
            <Text fontSize='md' color='white' fontWeight='bold'>
              Xavi Alfaro
            </Text>
            <Text fontSize='md' color='white' fontWeight='bold'>
              myemail@gmail.com
            </Text>
          </Flex>
        </Flex>
        <Button
          variant='solid'
          fontWeight='semibold'
          bg='red.600'
          rightIcon={<LogoutIc />}
          _hover={{ bg: 'red.500' }}
        >
          LOGOUT
        </Button>
      </Flex>
    </Box>
  )
}

export default Profile
