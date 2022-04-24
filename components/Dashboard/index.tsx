import { Grid } from '@chakra-ui/react'

import CurrentRooms from './CurrentRooms'
import People from './People'
import Profile from './Profile'
import MainPanel from './MainPanel'

const Dashboard = () => {
  return (
    <>
      <Grid templateColumns={{ sm: '1fr', lg: '1fr 2fr 1fr' }} templateRows='1fr' gap={5}>
        <Grid templateColumns='1fr' templateRows={{ sm: '1fr', lg: '200px 1fr' }} gap={5}>
          <Profile />
          <CurrentRooms />
        </Grid>
        <MainPanel />
        <People />
      </Grid>
    </>
  )
}

export default Dashboard
