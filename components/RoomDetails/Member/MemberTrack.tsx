import { Participant } from 'twilio-video'

import usePublications from 'hooks/usePublication'
import useTrackPublished from 'hooks/useTrackPublished'

import MemberVideo from './MemberMedia'

type Props = {
  member: Participant
}

const MemberTrack = ({ member }: Props) => {
  const { publications } = usePublications(member)
  const [audioPublication, videoPublication] = publications
  const audioTrack = useTrackPublished(audioPublication)
  const videoTrack = useTrackPublished(videoPublication)

  if (!audioTrack && !videoTrack) return null

  return <MemberVideo audioTrack={audioTrack} videoTrack={videoTrack} />
}

export default MemberTrack
