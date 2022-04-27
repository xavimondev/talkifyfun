import { Box, Button, Input } from '@chakra-ui/react'

import { EnterRoomIc } from 'components/Icons'

const FormNewRoom = () => {
  return (
    <Box mb={4}>
      <form
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
        />
        <Button
          variant='solid'
          fontWeight='semibold'
          bg='red.600'
          leftIcon={<EnterRoomIc />}
          _hover={{ bg: 'red.500' }}
        >
          JOIN
        </Button>
      </form>
    </Box>
  )
}

export default FormNewRoom
