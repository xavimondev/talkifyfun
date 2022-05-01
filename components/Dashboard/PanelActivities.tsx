import { Flex, Heading, Text } from '@chakra-ui/react'

type Props = {
  roomName: string
  amountPeople: number
  datetime: string
}

const Activity = ({ roomName, amountPeople, datetime }: Props): JSX.Element => {
  return (
    <Flex flexDirection='column' bg='#242c37' rounded='md' px={6} py={4} gap={2}>
      <Flex direction='row' justifyContent='space-between'>
        <Heading fontSize='md'>{roomName}</Heading>
        <Text fontSize='sm' fontWeight='semibold'>
          Members: {amountPeople}
        </Text>
      </Flex>
      <Text fontSize='sm'>{datetime}</Text>
    </Flex>
  )
}

const PanelActivities = () => {
  return (
    <>
      <Flex direction='column' gap={6}>
        <Heading fontSize='xl'>Your recent activities</Heading>
        <Flex direction='column' w='100%' gap={4}>
          <Activity roomName='testeando adventjs' amountPeople={30} datetime='29 Ago 2019 03:45' />
          <Activity roomName='mis ultimos juegos' amountPeople={30} datetime='29 Ago 2019 03:45' />
          <Activity roomName='vamos que va bien' amountPeople={30} datetime='29 Ago 2019 03:45' />
          <Activity roomName='la cuarta sala' amountPeople={30} datetime='29 Ago 2019 03:45' />
          <Activity roomName='otra sala de prueba' amountPeople={30} datetime='29 Ago 2019 03:45' />
        </Flex>
      </Flex>
    </>
  )
}

export default PanelActivities
