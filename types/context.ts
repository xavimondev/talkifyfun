import { RoomCall } from 'types/room'

export interface RoomState {
  listRooms: RoomCall[]
  roomSelected: RoomCall | null
  addRoom: (room: RoomCall) => void
  selectRoom: (room: RoomCall) => void
  findRoom: (room: string) => RoomCall | undefined
  unsetSelectedRoom: () => void
}
