import { useEffect, useRef, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import {
  AudioTrackPublication,
  LocalAudioTrack,
  LocalVideoTrack,
  Participant,
  RemoteAudioTrack,
  RemoteVideoTrack,
  VideoTrackPublication
} from 'twilio-video'

import ControlsRoom from './ControlsRoom'

type Props = {
  member: Participant
}

type TrackPublication = VideoTrackPublication | AudioTrackPublication
type MediaTrack = LocalVideoTrack | RemoteVideoTrack | LocalAudioTrack | RemoteAudioTrack | null

const Member = ({ member }: Props) => {
  // console.log(member)
  const [videoTracks, setVideoTracks] = useState<any[]>([])
  const [audioTracks, setAudioTracks] = useState<any[]>([])

  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const trackpubsToTracks = (trackMap: Map<string, TrackPublication>): MediaTrack[] =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null)

  useEffect(() => {
    const trackSubscribed = (track: any) => {
      if (track.kind === 'video') {
        setVideoTracks((videoTracks) => [...videoTracks, track])
      } else {
        setAudioTracks((audioTracks) => [...audioTracks, track])
      }
    }

    const trackUnsubscribed = (track: any) => {
      if (track.kind === 'video') {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track))
      } else {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track))
      }
    }

    setVideoTracks(trackpubsToTracks(member.videoTracks))
    setAudioTracks(trackpubsToTracks(member.audioTracks))

    member.on('trackSubscribed', trackSubscribed)
    member.on('trackUnsubscribed', trackUnsubscribed)

    return () => {
      setVideoTracks([])
      setAudioTracks([])
      member.removeAllListeners()
    }
  }, [member])

  useEffect(() => {
    const videoTrack = videoTracks[0]
    if (videoTrack) {
      videoTrack.attach(videoRef.current)
      return () => {
        videoTrack.detach()
      }
    }
  }, [videoTracks])

  useEffect(() => {
    const audioTrack = audioTracks[0]
    if (audioTrack) {
      audioTrack.attach(videoRef.current)
      return () => {
        audioTrack.detach()
      }
    }
  }, [audioTracks])

  return (
    <>
      <Flex
        // position='relative'
        direction='column'
        width={{
          base: '100%',
          lg: '65%',
          xl: '75%',
          '2xl': '75%'
        }}
        height={{
          base: '50%', // 0-48em
          lg: '100%',
          xl: '100%',
          '2xl': '75%'
        }}
        gap={6}
      >
        <Box borderRadius={10} overflow='hidden' width='auto' height='auto'>
          <video
            ref={videoRef}
            autoPlay={true}
            style={{
              width: '100%'
            }}
          />
          <audio ref={audioRef} autoPlay={true} muted={false} />
        </Box>
        <ControlsRoom />
      </Flex>
    </>
  )
}

export default Member
