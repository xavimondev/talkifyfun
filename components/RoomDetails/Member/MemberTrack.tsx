import { Participant } from 'twilio-video'

import usePublication from 'hooks/usePublication'
import useTrackPublished from 'hooks/useTrackPublished'

import MemberVideo from './MemberVideo'

type Props = {
  member: Participant
}

const MemberTrack = ({ member }: Props) => {
  const { getPublicationsByTrack } = usePublication(member)
  const videoPublication = getPublicationsByTrack('video')
  const audioPublication = getPublicationsByTrack('audio')

  const audioTrack = useTrackPublished(audioPublication)
  const videoTrack = useTrackPublished(videoPublication)

  if (!audioTrack && !videoTrack) return null

  return <MemberVideo audioTrack={audioTrack} videoTrack={videoTrack} member={member} />
}

export default MemberTrack
