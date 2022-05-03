import React from 'react'
import { Participant } from 'twilio-video'
import { Box } from '@chakra-ui/react'

import usePublications from 'hooks/usePublication'
import useMemberTrack from 'hooks/useMemberTrack'

import FallbackVideo from '../FallbackVideo'

type Props = {
  member: Participant
  full_name: string
  avatar_url: string
  children: React.ReactNode
}

const MemberInfo = ({ member, full_name, avatar_url, children }: Props) => {
  const { getPublicationsByTrack } = usePublications(member)
  const videoPublication = getPublicationsByTrack('video')
  const isVideoEnabled = useMemberTrack(videoPublication)

  return (
    <Box w='full' h='full'>
      {!isVideoEnabled && <FallbackVideo full_name={full_name} avatar_url={avatar_url} />}
      {isVideoEnabled && children}
    </Box>
  )
}

export default MemberInfo
