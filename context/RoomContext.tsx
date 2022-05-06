import { createContext, useContext, useEffect, useState } from 'react'

import { roomData } from 'config/roomData'
import { RoomCall } from 'types/room'
import { RoomState } from 'types/context'
import { supabase } from 'services/config'
import { listRoomsByOwner } from 'services/room'

const RoomContext = createContext<RoomState | null>(null)

// Props of our provider
type PropsRoomProvider = {
  children: React.ReactNode
}

export const RoomProvider = ({ children }: PropsRoomProvider) => {
  const [listRooms, setListRooms] = useState<RoomCall[]>(roomData)
  const [roomSelected, setRoomSelected] = useState<RoomCall | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const addRoomContext = (room: RoomCall) => setListRooms([room, ...listRooms])
  const selectRoom = (room: RoomCall) => setRoomSelected(room)
  const findRoom = (code: string) => listRooms.find((room) => room.shareable_code === code)
  const unsetSelectedRoom = () => setTimeout(() => setRoomSelected(null), 1000)

  useEffect(() => {
    const ownerId = supabase.auth.user()?.id

    if (ownerId) {
      setIsLoading(true)
      listRoomsByOwner(ownerId)
        .then((rooms) => {
          setListRooms((prevRooms) => [...rooms!, ...prevRooms])
        })
        .finally(() => setIsLoading(false))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const contextValue = {
    listRooms,
    roomSelected,
    addRoomContext,
    selectRoom,
    findRoom,
    unsetSelectedRoom,
    setListRooms,
    isLoading
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
