import { createContext, useContext, useState } from 'react'
import { Room } from 'twilio-video'

import { VideoState } from 'types/context'

const VideoContext = createContext<VideoState | null>(null)

type Props = {
  children: React.ReactNode
}

export const VideoProvider = ({ children }: Props) => {
  const [room, setRoom] = useState<Room | null>(null)

  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)

  /* Removing video and audio elements from DOM when user leave of the room */
  const leaveRoom = () => {
    room?.on('disconnected', (room) => {
      // Detach the local media elements
      room.localParticipant.tracks.forEach((publication: any) => {
        const attachedElements = publication.track.detach()
        attachedElements.forEach((element: any) => element.remove())
      })
    })
  }

  /* Enable o disable audio */
  const toggleUserAudio = () => {
    if (!room || !room.localParticipant) return

    if (isAudioEnabled) {
      room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.disable()
      })
    } else {
      room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.enable()
      })
    }
    setIsAudioEnabled(!isAudioEnabled)
  }

  /* Enable o disable video */
  const toggleUserVideo = () => {
    // toggle user's video track
    if (!room || !room.localParticipant) return
    if (isVideoEnabled) {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.disable()
      })
    } else {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.enable()
      })
    }
    setIsVideoEnabled(!isVideoEnabled)
  }

  const contextValues = {
    room,
    setRoom,
    leaveRoom,
    toggleUserAudio,
    toggleUserVideo,
    isAudioEnabled,
    isVideoEnabled
  }

  return <VideoContext.Provider value={contextValues}>{children}</VideoContext.Provider>
}

export const useVideoContext = () => {
  const context = useContext(VideoContext)
  if (context === null) {
    throw new Error('useRoomContext must be used within a RoomProvider')
  }
  return context
}
