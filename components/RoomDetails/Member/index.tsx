import { Participant } from 'twilio-video'

import MemberTrack from './MemberTrack'
import MemberInfo from './MemberInfo'

type Props = {
  member: Participant
}

const Member = ({ member }: Props) => {
  return (
    <MemberInfo member={member} full_name={'Test Avatar'} avatar_url={''}>
      <MemberTrack member={member} />
    </MemberInfo>
  )
}

export default Member
