import { useEffect, useState } from 'react'
import { Participant } from 'twilio-video'

import { useVideoContext } from 'context/VideoContext'

const useParticipant = () => {
  const [participants, setParticipants] = useState<Participant[]>([])
  const { room } = useVideoContext()

  useEffect(() => {
    const participantConnected = (participant: Participant) =>
      setParticipants((prevParticipants: Participant[]) => [...prevParticipants, participant])

    /* Remove participant to array when disconnect*/
    const participantDisconnected = (participant: Participant) =>
      setParticipants((prevParticipants: Participant[]) =>
        prevParticipants.filter((p: Participant) => p !== participant)
      )

    room?.on('participantConnected', participantConnected)
    room?.on('participantDisconnected', participantDisconnected)
    room?.participants.forEach(participantConnected)

    return () => {
      room?.off('participantConnected', participantConnected)
      room?.off('participantDisconnected', participantDisconnected)
    }
  }, [room])

  return {
    participants
  }
}

export default useParticipant
