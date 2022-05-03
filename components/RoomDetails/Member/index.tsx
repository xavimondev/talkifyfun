import { Participant } from 'twilio-video'

import MemberTrack from './MemberTrack'
import MemberInfo from './MemberInfo'

type Props = {
  member: Participant
}

const Member = ({ member }: Props) => {
  return (
    <MemberInfo member={member}>
      <MemberTrack member={member} />
    </MemberInfo>
  )
}

export default Member
