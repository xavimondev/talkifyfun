import Head from 'next/head'

type Props = {
  title: string
  content: string
}

const Header = ({ title, content }: Props) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content={content} />
        <meta name='author' content='xavimon.dev' />
        <title>{title}</title>
      </Head>
    </>
  )
}

export default Header
