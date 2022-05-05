import { useRef } from 'react'
import { Box, Button, Input } from '@chakra-ui/react'

import { saveRoomDatabase } from 'services/room'
import { supabase } from 'services/config'
import { RoomCall } from 'types/room'
import { getShareableRandomCode } from 'utils/getShareableCode'
import { useRoomContext } from 'context/RoomContext'
import { AddIc } from 'components/Icons'

const AddRoom = () => {
  const roomRef = useRef<HTMLInputElement>(null)
  const { addRoomContext } = useRoomContext()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const roomName = roomRef.current?.value
    if (!roomName) return

    // This field is for attaching to shareable code
    const dateNow = +Date.now()
    // Get current user's id
    const owner_id = supabase.auth.user()?.id

    const roomToSave: RoomCall = {
      owner_id,
      name: roomName,
      total_participant: 0,
      shareable_code: getShareableRandomCode(dateNow)
    }

    const data = await saveRoomDatabase(roomToSave)
    if (data) {
      // Getting data from database
      const { id, owner_id, shareable_code, name, total_participant } = data[0]
      const newRoom = {
        id,
        owner_id,
        name,
        total_participant,
        shareable_code
      }
      addRoomContext(newRoom)
      roomRef.current.value = ''
      roomRef.current?.focus()
    }
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
