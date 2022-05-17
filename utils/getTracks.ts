import { LocalVideoTrackPublication } from 'twilio-video'

export function getLocalVideoTracks(videoTracks: Map<string, LocalVideoTrackPublication>) {
  // Convert the map of video track publications to an array of corresponding tracks
  return Array.from(videoTracks.values())
    .map((publication: any) => publication.track)
    .filter((track) => track !== null)
}
