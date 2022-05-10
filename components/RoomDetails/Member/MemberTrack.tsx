import { Participant } from 'twilio-video'

import usePublication from 'hooks/usePublication'
import useTrackPublished from 'hooks/useTrackPublished'
import useMemberTrack from 'hooks/useMemberTrack'

import MemberVideo from './MemberVideo'

type Props = {
  member: Participant
}

const MemberTrack = ({ member }: Props) => {
  const { publications } = usePublication(member)

  // TODO: Improve this logic
  const [publicationOne, publicationTwo] = publications
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
  // Check if user's video is enabled
  const isVideoEnabled = useMemberTrack(videoPublication)

  if (!audioTrack && !videoTrack) return null

  return (
    <>
      {isVideoEnabled && (
        <MemberVideo audioTrack={audioTrack} videoTrack={videoTrack} member={member} />
      )}
    </>
  )
}

export default MemberTrack
