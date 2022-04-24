import type { NextPage } from 'next'

import Head from 'next/head'

import LoginWithProvider from 'components/Auth/Login'

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name='description' content='Login Page for authentication' />
      </Head>
      <LoginWithProvider />
    </>
  )
}

export default Login
