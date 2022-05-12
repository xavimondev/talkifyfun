import { useState, useEffect, useCallback } from 'react'
import {
  GaussianBlurBackgroundProcessor,
  VirtualBackgroundProcessor,
  ImageFit,
  isSupported
} from '@twilio/video-processors'
import { LocalVideoTrack, LocalVideoTrackPublication } from 'twilio-video'

import { PATH_ASSETS_VIDEO_PROCESSORS, VIRTUAL_BACKGROUND_PATHS } from 'config/constants'
import { useVideoContext } from 'context/VideoContext'

type Processor = VirtualBackgroundProcessor | GaussianBlurBackgroundProcessor | undefined
type TypeBackground = 'virtual' | 'blur' | 'disabled'

const IMAGES_ELEMENTS = new Map()

/**
 * Cache image as soon as is downloaded
 * @param key - key of the image you want to get
 * @returns Promise that resolves an image
 */
const getImage = (key: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (IMAGES_ELEMENTS.has(key)) {
      return resolve(IMAGES_ELEMENTS.get(key))
    }
    const img = new Image()
    img.onload = () => {
      IMAGES_ELEMENTS.set(key, img)
      resolve(img)
    }
    img.onerror = reject
    img.src = VIRTUAL_BACKGROUND_PATHS[key]
  })
}

let blurProcessor: GaussianBlurBackgroundProcessor
let virtualProcessor: VirtualBackgroundProcessor

export function getLocalVideoTracks(videoTracks: Map<string, LocalVideoTrackPublication>) {
  // Convert the map of video track publications to an array of corresponding tracks
  return Array.from(videoTracks.values())
    .map((publication: any) => publication.track)
    .filter((track) => track !== null)
}

const useVideoProcessor = () => {
  const IS_CHROMIUM_SUPPORTED = isSupported
  // localParticipant's video track
  const [videoTracks, setVideoTracks] = useState<LocalVideoTrack[] | null>([])
  const [hasProcessor, setHasProcessor] = useState(false)
  const { room } = useVideoContext()

  useEffect(() => {
    if (!IS_CHROMIUM_SUPPORTED) return

    if (room) {
      const tracks = getLocalVideoTracks(room.localParticipant.videoTracks)
      if (tracks) {
        setVideoTracks(tracks)
      }

      const initProcessors = async () => {
        if (!blurProcessor) {
          blurProcessor = new GaussianBlurBackgroundProcessor({
            assetsPath: PATH_ASSETS_VIDEO_PROCESSORS,
            maskBlurRadius: 5,
            blurFilterRadius: 10
          })
          await blurProcessor.loadModel()
        }

        if (!virtualProcessor) {
          virtualProcessor = new VirtualBackgroundProcessor({
            assetsPath: PATH_ASSETS_VIDEO_PROCESSORS,
            backgroundImage: await getImage('dubai'),
            fitType: ImageFit.Cover
          })
          await virtualProcessor.loadModel()
        }
      }
      initProcessors()
    }
  }, [])

  const removeProcessor = useCallback((videoTrack: LocalVideoTrack) => {
    // remove the existing processor from the track
    if (videoTrack.processor) videoTrack.removeProcessor(videoTrack.processor)
  }, [])

  const setProcessor = useCallback((processor: Processor, videoTrack: LocalVideoTrack) => {
    // set a new processor on a given track
    removeProcessor(videoTrack)
    if (processor) {
      videoTrack.addProcessor(processor)
    }
  }, [])

  const toggleBackground = useCallback(
    (processor: Processor) => {
      if (processor) {
        setProcessor(processor, videoTracks![0])
        setHasProcessor(true)
      }
    },
    [videoTracks]
  )

  const changeUserBackground = async (type: TypeBackground, keyImage: string | null = null) => {
    if (!videoTracks) return

    if (type === 'virtual' && keyImage) {
      virtualProcessor.backgroundImage = await getImage(keyImage)
      toggleBackground(virtualProcessor)
    } else if (type === 'blur') {
      toggleBackground(blurProcessor)
    } else {
      removeProcessor(videoTracks[0])
      setHasProcessor(false)
    }
  }

  return {
    changeUserBackground,
    hasProcessor,
    IS_CHROMIUM_SUPPORTED
  }
}

export default useVideoProcessor
