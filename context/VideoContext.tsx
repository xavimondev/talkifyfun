import { createContext, useContext, useState } from 'react'
import { Room } from 'twilio-video'

import { VideoState } from 'types/context'

import { useRoomContext } from './RoomContext'

const VideoContext = createContext<VideoState | null>(null)

type Props = {
  children: React.ReactNode
}

const INITIAL_STATUS_MEDIA = true

export const VideoProvider = ({ children }: Props) => {
  const [room, setRoom] = useState<Room | null>(null)
  const { unsetSelectedRoom } = useRoomContext()
  const [isAudioEnabled, setIsAudioEnabled] = useState(INITIAL_STATUS_MEDIA)
  const [isVideoEnabled, setIsVideoEnabled] = useState(INITIAL_STATUS_MEDIA)

  const leaveRoom = () => {
    setTimeout(() => {
      // Reset media values to initial state
      setIsAudioEnabled(INITIAL_STATUS_MEDIA)
      setIsVideoEnabled(INITIAL_STATUS_MEDIA)
      // Clear state room
      unsetSelectedRoom()
    }, 1000)
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
