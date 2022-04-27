import { Box, Button, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'

import { ThreadIc } from 'components/Icons'

type Props = {
  name: string
  totalParticipants: number
}

const Room = ({ name, totalParticipants }: Props): JSX.Element => {
  return (
    <Flex my={{ sm: '1rem', xl: '10px' }} alignItems='center' justifyContent='space-between'>
      <Flex direction='column'>
        <Text fontSize='md' color='white' fontWeight='bold'>
          {name}
        </Text>
        <Text fontSize='sm' color='#a1a2a9' fontFamily='body' fontWeight='semibold' me='16px'>
          Participants: {totalParticipants}
        </Text>
      </Flex>
      <Button variant='solid' size='sm' bg='red.600' _hover={{ bg: 'red.500' }}>
        JOIN
      </Button>
    </Flex>
  )
}

const CurrentRooms = () => {
  const bg = useColorModeValue('blue.400', '#181b29')
  return (
    <Box w='full' bg={bg} rounded='lg' p={6}>
      <Flex direction='row' alignItems='center' mb={6}>
        <ThreadIc />
        <Heading fontSize='xl' ml={4}>
          Rooms available
        </Heading>
      </Flex>
      <Flex direction='column' w='100%' gap={2}>
        <Room name='Name 1' totalParticipants={4} />
        <Room name='Name 2' totalParticipants={4} />
        <Room name='Name 3' totalParticipants={4} />
      </Flex>
    </Box>
  )
}

export default CurrentRooms
