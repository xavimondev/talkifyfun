import { Flex } from '@chakra-ui/react'

import useAuth from 'hooks/useAuth'
import { Profile as UserProfile } from 'types'

import RoomsAvailable from './RoomsAvailable'
import Profile from './Profile'
import MainPanel from './MainPanel'

type Props = {
  profile: UserProfile
}

const Dashboard = ({ profile }: Props) => {
  useAuth()

  return (
    <>
      <Flex
        direction='column'
        gap={5}
        width={{
          base: '100%',
          lg: '70%',
          xl: '70%',
          '2xl': '50%'
        }}
        height='full'
      >
        <Profile profile={profile} />
        <RoomsAvailable />
      </Flex>
      <MainPanel />
    </>
  )
}

export default Dashboard
