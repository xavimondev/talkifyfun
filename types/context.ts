import { Dispatch, SetStateAction } from 'react'
import { LocalVideoTrack, Room } from 'twilio-video'

import { RoomCall } from 'types/room'

export interface RoomState {
  listRooms: RoomCall[]
  roomSelected: RoomCall | null
  addRoomContext: (room: RoomCall) => void
  selectRoom: (room: RoomCall) => void
  findRoom: (room: string) => RoomCall | undefined
  unsetSelectedRoom: () => void
  setListRooms: Dispatch<SetStateAction<RoomCall[]>>
  isLoading: boolean
}

export interface VideoState {
  room: Room | null
  setRoom: Dispatch<SetStateAction<Room | null>>
  leaveRoom: () => void
  toggleUserAudio: () => void
  toggleUserVideo: () => void
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isSharing: boolean
  screenTrack: LocalVideoTrack | null
  screenShare: () => void
}
