import { useRef } from 'react'
import { Box, Button, Input } from '@chakra-ui/react'

import { RoomCall } from 'types/room'
import { AddIc } from 'components/Icons'

type Props = {
  addRoom: (room: RoomCall) => void
}

const AddRoom = ({ addRoom }: Props) => {
  const roomRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const roomName = roomRef.current?.value
    if (!roomName) return
    const id = +Date.now()
    const newRoom = {
      id,
      name: roomName,
      amountParticipants: 0,
      shareableCode: 'unknown-code'
    }
    addRoom(newRoom)
    roomRef.current.value = ''
    roomRef.current?.focus()
  }

  return (
    <Box mb={4}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <Input
          bg='#181b29'
          type='text'
          name='name'
          border='1px solid #181b29'
          placeholder='Enter room name'
          width='full'
          ref={roomRef}
        />
        <Button
          variant='solid'
          fontWeight='semibold'
          bg='red.600'
          leftIcon={<AddIc />}
          _hover={{ bg: 'red.500' }}
          type='submit'
        >
          ADD
        </Button>
      </form>
    </Box>
  )
}

export default AddRoom
