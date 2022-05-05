import { Participant } from 'twilio-video'

import usePublications from 'hooks/usePublication'
import useTrackPublished from 'hooks/useTrackPublished'

import ScreenShared from '../ScreenShared'

import MemberVideo from './MemberVideo'

type Props = {
  member: Participant
}

const MemberTrack = ({ member }: Props) => {
  const { publications } = usePublications(member)
  const screenTrack = publications[2]?.track
  // console.log('Publications <MemberTrack />', screenTrack)

  const [audioPublication, videoPublication] = publications
  const audioTrack = useTrackPublished(audioPublication)
  const videoTrack = useTrackPublished(videoPublication)

  if (!audioTrack && !videoTrack) return null

  if (screenTrack)
    return (
      <>
        <ScreenShared screenTrack={screenTrack} />
        <MemberVideo audioTrack={audioTrack} videoTrack={videoTrack} />
      </>
    )

  return <MemberVideo audioTrack={audioTrack} videoTrack={videoTrack} />
}

export default MemberTrack
