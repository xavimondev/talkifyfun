import React from 'react'
import { Participant } from 'twilio-video'
import { Box } from '@chakra-ui/react'

import usePublications from 'hooks/usePublication'
import useMemberTrack from 'hooks/useMemberTrack'

import FallbackVideo from '../FallbackVideo'

type Props = {
  member: Participant
  children: React.ReactNode
}

const MemberInfo = ({ member, children }: Props) => {
  const { getPublicationsByTrack } = usePublications(member)
  const videoPublication = getPublicationsByTrack('video')
  const isVideoEnabled = useMemberTrack(videoPublication)

  return (
    <Box w='full' h='full'>
      {!isVideoEnabled && <FallbackVideo userIdentity={member.identity} />}
      {children}
    </Box>
  )
}

export default MemberInfo
