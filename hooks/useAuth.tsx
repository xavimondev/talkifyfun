import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'

import { supabase } from 'services/config'

const useAuth = () => {
  const router = useRouter()
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // Send session to /api/auth route to set the auth cookie.
      setAuthCookie(event, session)
      if (event === 'SIGNED_IN') {
        router.push('/home')
      }
      if (event === 'SIGNED_OUT') {
        router.push('/auth/login')
      }
    })

    async function setAuthCookie(event: AuthChangeEvent, session: Session | null) {
      await fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session })
      })
    }

    return () => {
      authListener?.unsubscribe()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useAuth
