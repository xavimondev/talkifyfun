import { Flex, useColorModeValue } from '@chakra-ui/react'

import JoinRoom from '../Forms/JoinRoom'

import PanelActivities from './PanelActivities'

const MainPanel = () => {
  const bg = useColorModeValue('blue.400', '#181b29')
  return (
    <>
      <Flex gap={4} bg={bg} rounded='lg' p={6} direction='column' width='100%'>
        <JoinRoom />
        <PanelActivities />
      </Flex>
    </>
  )
}

export default MainPanel
