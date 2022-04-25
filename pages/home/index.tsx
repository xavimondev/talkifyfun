import type { GetServerSideProps, NextPage } from 'next'

import { useEffect } from 'react'

import { Profile } from 'types'
import { supabase } from 'services/config'
import { getToken } from 'utils/getToken'
import { getUserProfile } from 'utils/getUserProfile'
import Header from 'components/Header'
import Dashboard from 'components/Dashboard'
import Layout from 'components/Layout'

type Props = {
  profile: Profile
}

const Home: NextPage<Props> = ({ profile }) => {
  useEffect(() => {
    getToken('testing', profile.id).then(console.log)
  }, [])
  return (
    <>
      <Header title='Dashboard' content='Welcome to dashboard xavimon.dev 😊' />
      <Layout>
        <Dashboard profile={profile} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  const profile = getUserProfile(user)
  // console.log(profile)
  // CHECK: https://stackoverflow.com/questions/69215425/supabase-policies-on-getserversideprops-next-js
  if (!user) {
    return { redirect: { destination: '/auth/login', permanent: false } }
  }

  return { props: { profile } }
}

export default Home
