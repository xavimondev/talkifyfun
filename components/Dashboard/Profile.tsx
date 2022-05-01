import { Avatar, Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'

import { Profile } from 'types'
import { logout } from 'services/auth'
import { LogoutIc } from 'components/Icons'

type Props = {
  profile: Profile
}

const Profile = ({ profile }: Props) => {
  const { full_name, email, avatar_url } = profile
  const bg = useColorModeValue('blue.400', '#181b29')

  return (
    <Box w='full' bg={bg} rounded='lg' p={6}>
      <Flex direction='column' w='100%' gap={4}>
        <Flex
          direction={{
            base: 'column',
            md: 'row'
          }}
          alignItems='center'
          gap={4}
        >
          <Avatar size='xl' name={full_name} src={avatar_url} />
          <Flex
            direction='column'
            gap={2}
            alignItems={{
              base: 'center',
              md: 'flex-start'
            }}
          >
            <Text fontSize='md' color='white' fontWeight='bold' isTruncated>
              {full_name}
            </Text>
            <Text fontSize='md' color='white' fontWeight='bold' isTruncated>
              {email}
            </Text>
          </Flex>
        </Flex>
        <Button
          variant='solid'
          fontWeight='semibold'
          bg='red.600'
          rightIcon={<LogoutIc />}
          _hover={{ bg: 'red.500' }}
          onClick={() => logout()}
        >
          LOGOUT
        </Button>
      </Flex>
    </Box>
  )
}

export default Profile
