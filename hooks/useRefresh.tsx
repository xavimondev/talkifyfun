import { useEffect } from 'react'

// This hook will remove modelConfig, because the models should be load again after reload the page
const useRefresh = () => {
  useEffect(() => {
    const removeLocalStorage = () => {
      localStorage.removeItem('modelConfig')
    }

    window.addEventListener('beforeunload', removeLocalStorage)

    return () => {
      window.removeEventListener('beforeunload', removeLocalStorage)
    }
  }, [])
}

export default useRefresh
