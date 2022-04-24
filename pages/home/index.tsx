import type { NextPage } from 'next'

import Header from 'components/Header'
import Dashboard from 'components/Dashboard'

const Home: NextPage = () => {
  return (
    <>
      <Header title='Dashboard' content='Welcome to dashboard xavimon.dev 😊' />
      <Dashboard />
    </>
  )
}

export default Home
