import { Dispatch, SetStateAction } from 'react'
import { LocalTrack, LocalVideoTrack, RemoteTrack, RemoteVideoTrack, Room } from 'twilio-video'

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

export type ScreenTrack = LocalVideoTrack | RemoteVideoTrack | LocalTrack | RemoteTrack | null

export interface VideoState {
  room: Room | null
  setRoom: Dispatch<SetStateAction<Room | null>>
  leaveRoom: () => void
  toggleUserAudio: () => void
  toggleUserVideo: () => void
  screenShare: () => void
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  screenTrack: ScreenTrack
  setScreenTrack: Dispatch<SetStateAction<ScreenTrack>>
  clearRoom: () => void
}
