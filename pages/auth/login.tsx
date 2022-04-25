import type { GetServerSideProps, NextPage } from 'next'

import useAuth from 'hooks/useAuth'
import { supabase } from 'services/config'
import LoginWithProvider from 'components/Auth/Login'
import Header from 'components/Header'

const Login: NextPage = () => {
  useAuth()
  return (
    <>
      <Header title='Login' content='Login Page' />
      <LoginWithProvider />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (user) {
    return { redirect: { destination: '/home', permanent: false } }
  }

  return { props: {} }
}

export default Login
