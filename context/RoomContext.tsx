import { createContext, useContext, useState } from 'react'

import { roomData } from 'config/roomData'
import { RoomCall } from 'types/room'
import { RoomState } from 'types/context'

// Initialize our context
const initialValues = {
  listRooms: roomData,
  roomSelected: null,
  addRoom: () => undefined,
  selectRoom: () => undefined,
  findRoom: () => undefined
}

const RoomContext = createContext<RoomState>(initialValues)

// Props of our provider
type PropsRoomProvider = {
  children: React.ReactNode
}

export const RoomProvider = ({ children }: PropsRoomProvider) => {
  const [listRooms, setListRooms] = useState<RoomCall[]>(roomData)
  const [roomSelected, setRoomSelected] = useState<RoomCall | null>(null)

  const addRoom = (room: RoomCall) => setListRooms([room, ...listRooms])
  const selectRoom = (room: RoomCall) => setRoomSelected(room)
  const findRoom = (code: string) => listRooms.find((room) => room.shareableCode === code)

  const contextValue = {
    listRooms,
    roomSelected,
    addRoom,
    selectRoom,
    findRoom
  }
  return <RoomContext.Provider value={contextValue}>{children}</RoomContext.Provider>
}

export const useRoomContext = () => {
  const context = useContext(RoomContext)
  if (context === null) {
    throw new Error('useRoomContext must be used within a RoomProvider')
  }
  return context
}
