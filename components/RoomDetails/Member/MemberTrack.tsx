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

  // TODO: Improve this logic
  const [publicationOne, publicationTwo, screenVideoPublication] = publications
  let audioPublication = undefined,
    videoPublication = undefined

  if (publicationOne?.kind === 'video') {
    videoPublication = publicationOne
  } else {
    audioPublication = publicationOne
  }

  if (publicationTwo?.kind === 'video') {
    videoPublication = publicationTwo
  } else {
    audioPublication = publicationTwo
  }
  // End weird logic

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
