import { Button } from '@chakra-ui/react'

import { AddIc } from 'components/Icons'

const NewRoom = () => {
  return (
    <>
      <Button variant='solid' fontWeight='semibold' bg='red.600' mb={4} leftIcon={<AddIc />}>
        NEW ROOM
      </Button>
    </>
  )
}

export default NewRoom
