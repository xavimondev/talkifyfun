import { useRef } from 'react'
import { Box, Button, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'

import { EnterRoomIc } from 'components/Icons'
import { useRoomContext } from 'context/RoomContext'
import { dismissToast, showNotification } from 'utils/notify'

const JoinRoom = () => {
  const codeInputRef = useRef<HTMLInputElement>(null)
  const { selectRoom, findRoom } = useRoomContext()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const code = codeInputRef.current?.value
    if (!code) return
    const roomSearched = findRoom(code)
    if (roomSearched) {
      selectRoom(roomSearched)
      const toastId = showNotification('Redirecting to the room ➡️ ENJOY 🤩', 'loading')
      setTimeout(() => {
        dismissToast(toastId)
        router.push(`/room/${roomSearched.id}`)
      }, 2000)
    } else {
      showNotification('Room not found 😔', 'error')
    }
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
