import { useEffect, useRef } from 'react'

const useTrack = (videoTrack: any, audioTrack: any) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (videoTrack) {
      videoTrack.attach(videoRef.current)
      return () => {
        videoTrack.detach()
      }
    }
  }, [videoTrack])

  useEffect(() => {
    if (audioTrack) {
      audioTrack.attach(audioRef.current)
      return () => {
        audioTrack.detach()
      }
    }
  }, [audioTrack])

  return {
    videoRef,
    audioRef
  }
}

export default useTrack
