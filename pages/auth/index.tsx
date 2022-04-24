import type { NextPage } from 'next'

import LoginWithProvider from 'components/Auth/Login'
import Header from 'components/Header'

const Login: NextPage = () => {
  return (
    <>
      <Header title='Login' content='Login Page' />
      <LoginWithProvider />
    </>
  )
}

export default Login
