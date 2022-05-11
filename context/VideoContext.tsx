import { createContext, useRef, useContext, useState, useCallback } from 'react'
import { Room, LocalVideoTrack } from 'twilio-video'

import { DEFAULT_SETTINGS_SHARING } from 'config/screenShare'
import { ScreenTrack, VideoState } from 'types/context'

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
  const [screenTrack, setScreenTrack] = useState<ScreenTrack>(null)
  const stopScreenShareRef = useRef<() => void>()

  const leaveRoom = () => {
    setTimeout(() => {
      // Reset media values to initial state
      setIsAudioEnabled(INITIAL_STATUS_MEDIA)
      setIsVideoEnabled(INITIAL_STATUS_MEDIA)
      // Cleaning state room
      unsetSelectedRoom()
      room?.disconnect()
      setRoom(null)
      // Cleaning state and stop screen track in case user was sharing screen
      setScreenTrack(null)
    }, 1000)
  }

  const clearRoom = useCallback(() => {
    setRoom((prevRoom: Room | null) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPublication: any) => {
          trackPublication.track.stop()
        })
        prevRoom.disconnect()
      }
      return null
    })
  }, [])

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
        // If someone is sharing its screen and turn off its camera, it will continue sharing the screen
        // For that I just disabled video track
        if (publication.trackName !== 'screen') publication.track.disable()
      })
    } else {
      room.localParticipant.videoTracks.forEach((publication) => {
        // I just disabled video track
        if (publication.trackName !== 'screen') publication.track.enable()
      })
    }
    setIsVideoEnabled(!isVideoEnabled)
  }

  /* Enable or disable screen sharing */
  const screenShare = async () => {
    navigator.mediaDevices.getDisplayMedia(DEFAULT_SETTINGS_SHARING).then((stream) => {
      const track = stream.getTracks()[0]
      // logLevel is deprecated, but it's neccesary to send as argument
      const userScreen = new LocalVideoTrack(track, { name: 'screen', logLevel: 'info' })

      room!.localParticipant.publishTrack(userScreen).then((trackPublication) => {
        stopScreenShareRef.current = () => {
          room!.localParticipant.unpublishTrack(track)
          room!.localParticipant.emit('trackUnpublished', trackPublication)
          track.stop()
        }
        track.onended = stopScreenShareRef.current
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
    screenTrack,
    setScreenTrack,
    clearRoom
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
