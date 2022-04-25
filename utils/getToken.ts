/**
 *
 * @param roomId - Represent your room id
 * @param userId - Represent user's id session
 * @returns
 */
export const getToken = async (roomId: string, userId: string) => {
  try {
    const data = await fetch('/api/token', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        roomId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { token } = await data.json()
    return token
  } catch (e) {
    console.error(e)
    return null
  }
}
