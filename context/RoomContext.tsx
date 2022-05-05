import { createContext, useContext, useState } from 'react'

import { roomData } from 'config/roomData'
import { RoomCall } from 'types/room'
import { RoomState } from 'types/context'

const RoomContext = createContext<RoomState | null>(null)

// Props of our provider
type PropsRoomProvider = {
  children: React.ReactNode
}

export const RoomProvider = ({ children }: PropsRoomProvider) => {
  const [listRooms, setListRooms] = useState<RoomCall[]>(roomData)
  const [roomSelected, setRoomSelected] = useState<RoomCall | null>(null)

  const addRoomContext = (room: RoomCall) => setListRooms([room, ...listRooms])
  const selectRoom = (room: RoomCall) => setRoomSelected(room)
  const findRoom = (code: string) => listRooms.find((room) => room.shareable_code === code)
  const unsetSelectedRoom = () => setTimeout(() => setRoomSelected(null), 1000)

  const contextValue = {
    listRooms,
    roomSelected,
    addRoomContext,
    selectRoom,
    findRoom,
    unsetSelectedRoom
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
