import { createContext, useRef, useContext, useState } from 'react'
import { LocalVideoTrack, Room } from 'twilio-video'

import { DEFAULT_SETTINGS_SHARING } from 'config/screenShare'
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
  // the screen track shared by a participant
  const [screenTrack, setScreenTrack] = useState<LocalVideoTrack | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const stopScreenShareRef = useRef<() => void>()

  const leaveRoom = () => {
    setTimeout(() => {
      // Reset media values to initial state
      setIsAudioEnabled(INITIAL_STATUS_MEDIA)
      setIsVideoEnabled(INITIAL_STATUS_MEDIA)
      // Cleaning state room
      unsetSelectedRoom()
      // Cleaning state in case user was sharing screen
      setIsSharing(false)
      setScreenTrack(null)
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

  /* Enable or disable screen sharing */
  const screenShare = async () => {
    navigator.mediaDevices.getDisplayMedia(DEFAULT_SETTINGS_SHARING).then((stream) => {
      const track = stream.getTracks()[0]
      const userScreen = new LocalVideoTrack(track)
      setScreenTrack(userScreen)
      room!.localParticipant.publishTrack(userScreen).then((trackPublication) => {
        stopScreenShareRef.current = () => {
          room!.localParticipant.unpublishTrack(track)
          room!.localParticipant.emit('trackUnpublished', trackPublication)
          track.stop()
          setIsSharing(false)
          setScreenTrack(null)
        }

        track.onended = stopScreenShareRef.current
        setIsSharing(true)
      })
    })
  }

  const contextValues = {
    room,
    setRoom,
    leaveRoom,
    toggleUserAudio,
    toggleUserVideo,
    screenShare,
    isAudioEnabled,
    isVideoEnabled,
    isSharing,
    screenTrack
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
