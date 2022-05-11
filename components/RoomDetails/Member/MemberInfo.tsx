import React from 'react'
import { Participant } from 'twilio-video'

import usePublication from 'hooks/usePublication'
import useMemberTrack from 'hooks/useMemberTrack'
import useTrackPublished from 'hooks/useTrackPublished'

import MemberFallback from './MemberFallback'

type Props = {
  member: Participant
  children: React.ReactNode
}

const MemberInfo = ({ member, children }: Props) => {
  const { getPublicationsByTrack } = usePublication(member)
  const videoPublication = getPublicationsByTrack('video')
  const isVideoEnabled = useMemberTrack(videoPublication)

  // Suscribed to screen track
  const screenPublication = getPublicationsByTrack('screen')
  useTrackPublished(screenPublication)

  return <>{!isVideoEnabled ? <MemberFallback member={member} /> : children}</>
}

export default MemberInfo
