import { Participant } from 'twilio-video'

import Member from './Member'

type Props = {
  participants: Participant[]
}

const ListRemoteMembers = ({ participants }: Props) => {
  return (
    <>
      {participants.map((participant) => (
        <Member key={participant.sid} member={participant} />
      ))}
    </>
  )
}

export default ListRemoteMembers
