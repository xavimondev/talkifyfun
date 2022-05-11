import { useCallback, useEffect, useState } from 'react'
import { LocalTrackPublication, Participant, RemoteTrackPublication } from 'twilio-video'

import { useVideoContext } from 'context/VideoContext'

export type TrackPublication = LocalTrackPublication | RemoteTrackPublication

export default function usePublication(participant: Participant) {
  const { setScreenTrack } = useVideoContext()
  const [publications, setPublications] = useState<TrackPublication[]>([])

  const getPublicationsByTrack = useCallback(
    (track: 'video' | 'audio' | 'screen') => {
      if (track !== 'screen')
        return publications.find((p) => p.trackName !== 'screen' && p.kind === track)

      return publications.find((p) => p.trackName === 'screen')
    },
    [publications]
  )

  useEffect(() => {
    setPublications(Array.from(participant.tracks.values()) as TrackPublication[])

    const publicationAdded = (publication: TrackPublication) => {
      // Add the publications of shared screen
      setPublications((prevPublications) => [...prevPublications, publication])
      setScreenTrack(publication.track)
    }
    const publicationRemoved = (publication: TrackPublication) => {
      // Remove publications of shared screen when user "stop sharing"
      setPublications((prevPublications) => prevPublications.filter((p) => p !== publication))
      setScreenTrack(null)
    }

    participant.on('trackPublished', publicationAdded)
    participant.on('trackUnpublished', publicationRemoved)
    return () => {
      participant.off('trackPublished', publicationAdded)
      participant.off('trackUnpublished', publicationRemoved)
    }
  }, [participant]) //eslint-disable-line react-hooks/exhaustive-deps

  return {
    publications,
    getPublicationsByTrack
  }
}
