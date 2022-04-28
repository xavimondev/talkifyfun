import NextLink from 'next/link'
import { Box, Flex, Heading, Link, useColorModeValue } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

import { showNotification } from 'utils/notify'
import { copyTextToClipboard } from 'utils/copyClipboard'
import { useRoomContext } from 'context/RoomContext'
import { BackIc } from 'components/Icons'

const HeaderRoom = () => {
  const bg = useColorModeValue('blue.400', '#181b29')
  const { unsetSelectedRoom, roomSelected } = useRoomContext()

  const copyShareableCode = async () => {
    await copyTextToClipboard(roomSelected!.shareableCode)
    showNotification('shareable code copied to clipboard', 'success')
  }

  return (
    <Box w='full' bg={bg} rounded='lg' p={{ base: 4, lg: 6, xl: 6 }}>
      <Toaster />
      <Flex gap={3} align='center'>
        <NextLink href='/home' passHref>
          <Link onClick={unsetSelectedRoom}>
            <BackIc width='30px' height='30px' />
          </Link>
        </NextLink>
        <Heading
          fontSize={{ base: 'sm', md: 'md', lg: 'xl', xl: '2xl' }}
          onClick={copyShareableCode}
          isTruncated
        >
          {roomSelected?.name}
        </Heading>
      </Flex>
    </Box>
  )
}

export default HeaderRoom
