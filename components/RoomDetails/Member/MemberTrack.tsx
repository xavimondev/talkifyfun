import { Participant } from 'twilio-video'

import usePublications from 'hooks/usePublication'
import useTrackPublished from 'hooks/useTrackPublished'
import useMemberTrack from 'hooks/useMemberTrack'

import ScreenShared from '../ScreenShared'

import MemberVideo from './MemberVideo'

type Props = {
  member: Participant
}

const MemberTrack = ({ member }: Props) => {
  const { publications } = usePublications(member)

  const [audioPublication, videoPublication, screenVideoPublication] = publications
  const audioTrack = useTrackPublished(audioPublication)
  const videoTrack = useTrackPublished(videoPublication)
  // screenVideoPublication could be undefined as long as no one is sharing its screen
  const screenTrack = useTrackPublished(screenVideoPublication)

  const isVideoEnabled = useMemberTrack(videoPublication)

  if (!audioTrack && !videoTrack) return null

  return (
    <>
      {screenTrack && <ScreenShared screenTrack={screenTrack} />}
      {isVideoEnabled && <MemberVideo audioTrack={audioTrack} videoTrack={videoTrack} />}
    </>
  )
}

export default MemberTrack
