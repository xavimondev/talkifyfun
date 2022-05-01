import type { GetServerSideProps, NextPage } from 'next'

import { Profile } from 'types'
import { supabase } from 'services/config'
import { getUserProfile } from 'utils/getUserProfile'
import Dashboard from 'components/Dashboard'
import LayoutIndex from 'components/Layout/LayoutIndex'

type Props = {
  profile: Profile
}

const Home: NextPage<Props> = ({ profile }) => {
  return (
    <>
      <LayoutIndex>
        <Dashboard profile={profile} />
      </LayoutIndex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  const profile = getUserProfile(user)

  // CHECK: https://stackoverflow.com/questions/69215425/supabase-policies-on-getserversideprops-next-js
  if (!user) {
    return { redirect: { destination: '/auth/login', permanent: false } }
  }

  return { props: { profile } }
}

export default Home
