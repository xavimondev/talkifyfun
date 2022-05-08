import React, { useEffect, useState } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'

import { getRelativeTime } from 'utils/getRelativeTime'
import { Activity } from 'types/room'
import { listActivitiesByUser } from 'services/activities'
import { supabase } from 'services/config'

type Props = {
  activity: Activity
}

const Activity = ({ activity }: Props): JSX.Element => {
  const { title, created_at } = activity

  return (
    <Flex flexDirection='column' bg='#242c37' rounded='md' px={6} py={4} gap={2}>
      <Flex direction='row' justifyContent='space-between'>
        <Heading fontSize='md'>{title}</Heading>
      </Flex>
      <Text fontSize='sm'>{getRelativeTime(new Date(created_at!))}</Text>
    </Flex>
  )
}

const PanelActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userId = supabase.auth.user()?.id
    if (userId) {
      setLoading(true)
      listActivitiesByUser(userId).then((activities) => {
        setActivities(activities!)
        setLoading(false)
      })
    }
  }, [])

  return (
    <>
      <Flex direction='column' gap={6}>
        <Heading fontSize='xl'>Your recent activities</Heading>
        <Flex direction='column' w='100%' gap={4}>
          {loading && <Text>Loading activities...</Text>}
          {activities.map((activity) => (
            <Activity key={activity.id} activity={activity} />
          ))}
        </Flex>
      </Flex>
    </>
  )
}

export default PanelActivities
