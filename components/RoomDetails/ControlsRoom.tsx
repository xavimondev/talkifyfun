import { ButtonGroup, Flex, IconButton, Text } from '@chakra-ui/react'

import {
  BreakRoomIc,
  LeaveRoomIc,
  MicrophoneIc,
  MicrophoneMutedIc,
  ScreenShareIc
} from 'components/Icons'

const ControlsRoom = () => {
  return (
    <>
      <Flex
        position='absolute'
        bottom={24}
        borderRadius={20}
        p={3}
        bg='gray.700'
        gap={6}
        align='center'
        justify='center'
      >
        <Text color='red.500' fontWeight='bold' fontSize='md'>
          08:03
        </Text>
        <ButtonGroup orientation='horizontal' spacing={3}>
          <IconButton size='md' aria-label='muted' icon={<MicrophoneIc />} />
          <IconButton size='md' aria-label='muted' icon={<ScreenShareIc />} />
          <IconButton
            size='md'
            bg='red.500'
            _hover={{
              bg: 'red.500'
            }}
            aria-label='muted'
            icon={<LeaveRoomIc />}
          />
          <IconButton size='md' aria-label='muted' icon={<MicrophoneMutedIc />} />
          <IconButton size='md' aria-label='muted' icon={<BreakRoomIc />} />
        </ButtonGroup>
      </Flex>
    </>
  )
}

export default ControlsRoom
