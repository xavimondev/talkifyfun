export const VIRTUAL_BACKGROUND_PATHS: any = {
  midu_office: '/twilio-video-processors/backgrounds/midu-office.jpeg',
  agujero_negro: '/twilio-video-processors/backgrounds/agujero-negro.jpeg',
  dubai: '/twilio-video-processors/backgrounds/dubai.jpeg',
  google: '/twilio-video-processors/backgrounds/google.jpeg',
  random_office: '/twilio-video-processors/backgrounds/random-office.jpeg',
  random_place: '/twilio-video-processors/backgrounds/random-place.jpeg'
}

export const PATH_ASSETS_VIDEO_PROCESSORS = '/twilio-video-processors/lib-assets'

// There are other best ways to detect mobile browser
// The Following links give more information
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
// https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3

export const IS_MOBILE = typeof navigator === 'undefined' ? false : /Mobi/.test(navigator.userAgent)
