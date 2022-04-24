import type { NextPage } from 'next'

import Header from 'components/Header'
import Dashboard from 'components/Dashboard'
import Layout from 'components/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Header title='Dashboard' content='Welcome to dashboard xavimon.dev 😊' />
      <Layout>
        <Dashboard />
      </Layout>
    </>
  )
}

export default Home
