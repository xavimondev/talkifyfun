import { Avatar, Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'

import { PeopleIc } from 'components/Icons'

type Props = {
  name: string
  avatarUrl: string
}

const Contact = ({ name, avatarUrl }: Props): JSX.Element => {
  return (
    <Flex alignItems='center'>
      <Avatar size='sm' mr='5' name={name} src={avatarUrl} />
      <Text fontSize='md' color='white' fontWeight='semibold'>
        {name}
      </Text>
    </Flex>
  )
}

const People = () => {
  const bg = useColorModeValue('blue.400', '#181b29')
  return (
    <Box w='full' bg={bg} rounded='lg' p={6}>
      <Flex direction='row' alignItems='center' mb={6}>
        <PeopleIc />
        <Heading fontSize='xl' ml={4}>
          People
        </Heading>
      </Flex>
      <Flex direction='column' w='100%' gap={4}>
        <Contact name='Name 1' avatarUrl='online' />
        <Contact name='Name 2' avatarUrl='online' />
        <Contact name='Name 3' avatarUrl='online' />
        <Contact name='Name 4' avatarUrl='offline' />
        <Contact name='Name 5' avatarUrl='offline' />
      </Flex>
    </Box>
  )
}

export default People
