import { useState, useEffect, useCallback } from 'react'
import {
  GaussianBlurBackgroundProcessor,
  VirtualBackgroundProcessor,
  ImageFit,
  isSupported
} from '@twilio/video-processors'
import { LocalVideoTrack } from 'twilio-video'

import { PATH_ASSETS_VIDEO_PROCESSORS } from 'config/constants'
import { getLocalVideoTracks } from 'utils/getTracks'
import { getImage } from 'utils/getImage'
import { useVideoContext } from 'context/VideoContext'

type Processor = VirtualBackgroundProcessor | GaussianBlurBackgroundProcessor | undefined
type TypeBackground = 'virtual' | 'blur' | 'disabled'

let blurProcessor: GaussianBlurBackgroundProcessor
let virtualProcessor: VirtualBackgroundProcessor

const useVideoProcessor = () => {
  const IS_CHROMIUM_SUPPORTED = isSupported
  const { room } = useVideoContext()
  // localParticipant's video track
  const [videoTracks, setVideoTracks] = useState<LocalVideoTrack[] | null>([])
  const [hasProcessor, setHasProcessor] = useState<boolean>(false)
  const [modelConfig, setModelConfig] = useState(() => {
    const saved = localStorage.getItem('modelConfig')
    const initialValue = saved && JSON.parse(saved)
    return initialValue || {}
  })

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
          blurProcessor
            .loadModel()
            .then(() => setModelConfig((prevConfig: any) => ({ ...prevConfig, blur: true })))
        }

        if (!virtualProcessor) {
          virtualProcessor = new VirtualBackgroundProcessor({
            assetsPath: PATH_ASSETS_VIDEO_PROCESSORS,
            backgroundImage: await getImage('dubai'),
            fitType: ImageFit.Cover
          })
          virtualProcessor
            .loadModel()
            .then(() => setModelConfig((prevConfig: any) => ({ ...prevConfig, virtual: true })))
        }
      }
      initProcessors()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    localStorage.setItem('modelConfig', JSON.stringify(modelConfig))
  }, [modelConfig])

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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleBackground = useCallback(
    (processor: Processor) => {
      if (processor) {
        setProcessor(processor, videoTracks![0])
        setHasProcessor(true)
      }
    },
    [videoTracks] // eslint-disable-line react-hooks/exhaustive-deps
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
    IS_CHROMIUM_SUPPORTED,
    modelConfig
  }
}

export default useVideoProcessor
