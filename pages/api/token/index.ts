import type { NextApiRequest, NextApiResponse } from 'next'

import twilio from 'twilio'

const ACCOUNT_SID = process.env.ACCOUNT_SID as string
const API_KEY_SID = process.env.API_KEY_SID as string
const API_KEY_SECRET = process.env.API_KEY_SECRET as string

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  /**
   * userId: It will be user's id from provider auth
   * roomId: It will be a room selected by user
   */
  const { userId, roomId } = req.body

  const token = new twilio.jwt.AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET, {
    identity: userId
  })

  const grant = new twilio.jwt.AccessToken.VideoGrant({
    room: roomId
  })
  token.addGrant(grant)

  res.status(200).json({ token: token.toJwt() })
}
