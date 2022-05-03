import { useEffect, useState } from 'react'
import { LocalTrackPublication, RemoteTrackPublication } from 'twilio-video'

type PublicationType = LocalTrackPublication | RemoteTrackPublication | undefined

const useTrackPublished = (publication: PublicationType) => {
  const [track, setTrack] = useState(publication && publication.track)

  useEffect(() => {
    // Reset the track when the 'publication' variable changes.
    setTrack(publication && publication.track)

    if (publication) {
      const removeTrack = () => setTrack(null)

      publication.on('subscribed', setTrack)
      publication.on('unsubscribed', removeTrack)
      return () => {
        publication.off('subscribed', setTrack)
        publication.off('unsubscribed', removeTrack)
      }
    }
  }, [publication])

  return track
}

export default useTrackPublished
