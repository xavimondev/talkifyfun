import { useEffect, useState } from 'react'
import { LocalTrackPublication, RemoteTrackPublication } from 'twilio-video'

import { useVideoContext } from 'context/VideoContext'

type PublicationType = LocalTrackPublication | RemoteTrackPublication | undefined

const useTrackPublished = (publication: PublicationType) => {
  const { setScreenTrack } = useVideoContext()
  const [track, setTrack] = useState(publication && publication.track)

  useEffect(() => {
    const addTrack = () => {
      setTrack(publication && publication.track)
      if (publication?.trackName === 'screen') setScreenTrack(publication.track)
    }

    addTrack()
    if (publication) {
      const removeTrack = () => {
        setTrack(null)
        if (publication.trackName === 'screen') setScreenTrack(null)
      }

      publication.on('subscribed', addTrack)
      publication.on('unsubscribed', removeTrack)
      return () => {
        publication.off('subscribed', addTrack)
        publication.off('unsubscribed', removeTrack)
      }
    }
  }, [publication, setScreenTrack])

  return track
}

export default useTrackPublished
