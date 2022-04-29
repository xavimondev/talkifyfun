import { Dispatch, SetStateAction } from 'react'
import { Room } from 'twilio-video'

import { RoomCall } from 'types/room'

export interface RoomState {
  listRooms: RoomCall[]
  roomSelected: RoomCall | null
  addRoom: (room: RoomCall) => void
  selectRoom: (room: RoomCall) => void
  findRoom: (room: string) => RoomCall | undefined
  unsetSelectedRoom: () => void
}

export interface VideoState {
  room: Room | null
  setRoom: Dispatch<SetStateAction<Room | null>>
  // participants: Participant[]
  // participantConnected: (participant: Participant) => void
  // participantDisconnected: (participant: Participant) => void
  leaveRoom: () => void
  toggleUserAudio: () => void
  toggleUserVideo: () => void
  isAudioEnabled: boolean
  isVideoEnabled: boolean
}
