import { Grid, useColorModeValue } from '@chakra-ui/react'

import FormMeeting from '../FormMeeting'
import PanelActivities from '../PanelActivities'

const MainPanel = () => {
  const bg = useColorModeValue('blue.400', '#181b29')
  return (
    <>
      <Grid gap={4} bg={bg} rounded='lg' p={6}>
        <FormMeeting />
        <PanelActivities />
      </Grid>
    </>
  )
}

export default MainPanel
