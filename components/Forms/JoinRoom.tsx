import { useRef } from 'react'
import { Box, Button, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'

import { dismissToast, showNotification } from 'utils/notify'
import { Activity } from 'types/room'
import { searchRoomByCode } from 'services/room'
import { supabase } from 'services/config'
import { saveActivityDatabase } from 'services/activities'
import { useRoomContext } from 'context/RoomContext'
import { EnterRoomIc } from 'components/Icons'

const JoinRoom = () => {
  const codeInputRef = useRef<HTMLInputElement>(null)
  const { selectRoom, findRoom } = useRoomContext()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const code = codeInputRef.current?.value
    if (!code) return

    // First we search locally(our room data)
    let roomSearched = findRoom(code)
    if (!roomSearched) {
      // If not found, we search on the database.
      // This case gonna happen when you will be invited to join another room
      roomSearched = await searchRoomByCode(code)
      if (!roomSearched) {
        showNotification('Room not found 😔', 'error')
        return
      }
    }

    // We have a room!
    const userId = supabase.auth.user()?.id
    const titleActivity = 'You have joined at the room: ' + roomSearched.name
    const activity: Activity = {
      title: titleActivity,
      user_id: userId
    }

    // Set the selected room
    selectRoom(roomSearched)
    // Create the activity
    await saveActivityDatabase(activity)
    const toastId = showNotification('Redirecting to the room ➡️ ENJOY 🤩', 'loading')
    setTimeout(() => {
      dismissToast(toastId)
      router.push(`/room/${roomSearched?.id}`)
    }, 2000)
  }

  return (
    <Box mb={4}>
      <Toaster />
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
          placeholder='Please enter your room code to join'
          width='full'
          ref={codeInputRef}
        />
        <Button
          variant='solid'
          fontWeight='semibold'
          bg='red.600'
          leftIcon={<EnterRoomIc />}
          _hover={{ bg: 'red.500' }}
          type='submit'
        >
          JOIN
        </Button>
      </form>
    </Box>
  )
}

export default JoinRoom
