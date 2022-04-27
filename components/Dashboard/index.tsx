// import { useState } from 'react'
import { Grid } from '@chakra-ui/react'

import useAuth from 'hooks/useAuth'
import { Profile as UserProfile } from 'types'
import useDashboard from 'hooks/useDashboard'

import CurrentRooms from './CurrentRooms'
import People from './People'
import Profile from './Profile'
import MainPanel from './MainPanel'

type Props = {
  profile: UserProfile
}

const Dashboard = ({ profile }: Props) => {
  useAuth()

  return (
    <>
      <Grid templateColumns={{ sm: '1fr', lg: '1fr 2fr 1fr' }} templateRows='1fr' gap={5}>
        <Grid templateColumns='1fr' templateRows={{ sm: '1fr', lg: '200px 1fr' }} gap={5}>
          <Profile profile={profile} />
          <CurrentRooms />
        </Grid>
        <MainPanel />
        <People />
      </Grid>
    </>
  )
}

export default Dashboard
