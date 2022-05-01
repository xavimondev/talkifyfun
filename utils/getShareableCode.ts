const FUNNY_CODES_AVAILABLE = [
  'la-suma-de-numeros-es-numero',
  'hoy-es-nuevo-dia',
  'quiero-un-teclado',
  'midu-twitch-tv',
  'tu-web-a-juicio',
  'a-weird-code',
  'anonymous-code-hackaton',
  'show-me-your-code',
  '404-not-found',
  '500-error-server',
  '307-redirect-now',
  '666-unknown-code',
  'sin-midu-no-hay-paraiso',
  'challenge-accepted',
  '308-permament-redirect',
  '400-bad-request',
  '401-no-pasas-de-aqui',
  '403-midu-forbidden',
  'console-log-xd',
  'no-seas-troll',
  'clean-arkitectur',
  'keychron-v2-sin-teclas',
  'keychron-v3-con-teclas'
]

export const getShareableRandomCode = (id: string | number): string => {
  const pos = Math.floor(Math.random() * FUNNY_CODES_AVAILABLE.length)
  const randomCode = FUNNY_CODES_AVAILABLE[pos]
  return `${randomCode}-${id}`
}
