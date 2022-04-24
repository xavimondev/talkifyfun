import { Grid, useColorModeValue } from '@chakra-ui/react'

import NewRoom from '../Buttons/NewRoom'
import PanelActivities from '../PanelActivities'

const MainPanel = () => {
  const bg = useColorModeValue('blue.400', '#181b29')
  return (
    <>
      <Grid gap={4} bg={bg} rounded='lg' p={6}>
        <NewRoom />
        <PanelActivities />
      </Grid>
    </>
  )
}

export default MainPanel
