import React from 'react'
import { Participant } from 'twilio-video'

import usePublications from 'hooks/usePublication'
import useMemberTrack from 'hooks/useMemberTrack'

import MemberFallback from './MemberFallback'

type Props = {
  member: Participant
  children: React.ReactNode
}

const MemberInfo = ({ member, children }: Props) => {
  const { getPublicationsByTrack } = usePublications(member)
  const videoPublication = getPublicationsByTrack('video')
  const isVideoEnabled = useMemberTrack(videoPublication)
  return (
    <>
      {!isVideoEnabled && <MemberFallback userIdentity={member.identity} />}
      {children}
    </>
  )
}

export default MemberInfo
