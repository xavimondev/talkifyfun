import { useState } from 'react'

import { roomData } from 'config/roomData'
import { RoomCall } from 'types/room'

const useDashboard = () => {
  const [listRooms, setListRooms] = useState<RoomCall[]>(roomData)
  const addRoom = (room: RoomCall) => setListRooms([room, ...listRooms])

  return {
    listRooms,
    addRoom
  }
}

export default useDashboard
