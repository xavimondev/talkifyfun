import { GetServerSideProps } from 'next'
import { User } from '@supabase/supabase-js'
import { Flex, Grid } from '@chakra-ui/react'

import useRoom from 'hooks/useRoom'
import { supabase } from 'services/config'
import PeopleConnected from 'components/RoomDetails/PeopleConnected'
import HeaderRoom from 'components/RoomDetails/HeaderRoom'
import VideoCall from 'components/RoomDetails/VideoCall'
import FallbackVideo from 'components/RoomDetails/FallbackVideo'
import Member from 'components/RoomDetails/Member'
import Header from 'components/Header'

type Props = {
  userId: User['id']
  roomId: string
}

// Set video call capacity: https://www.twilio.com/console/video/configure
// DEFAULT TWILIO CAPACITY = 50
// CURRENT iwannaknowyu MAX_CAPACITY = 15

const RoomDetails = ({ userId, roomId }: Props) => {
  const { room, participants } = useRoom(userId, roomId)

  return (
    <>
      <Header
        title={'Room: Charlando con midudev'}
        content='Welcome to the room 🙂 Charlando con midudev'
      />
      <Flex className='room' direction='column' m={8} gap={6}>
        <HeaderRoom title={'Charlando con midudev'} />
        <Grid
          gridTemplateColumns={{ base: '1fr', md: '2fr 1fr', lg: '2fr 1fr', xl: '3fr 1fr' }}
          gridTemplateRows={{ base: '500px', lg: '550px', xl: '650px' }}
          gap={6}
        >
          {/* <Member member={room?.localParticipant} />
        <PeopleConnected participants={participants} /> */}
          <VideoCall member={room?.localParticipant}>
            {/* <FallbackVideo /> */}
            {room ? <Member member={room?.localParticipant} /> : <FallbackVideo />}
          </VideoCall>
          <PeopleConnected participants={participants} />
        </Grid>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { redirect: { destination: '/auth/login', permanent: false } }
  }

  return { props: { userId: user.id, roomId: query.id } }
}

export default RoomDetails
