import { Box, Flex, Heading, Link, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

import { BackIc } from 'components/Icons'

type Props = {
  title: string | undefined
}

const HeaderRoom = ({ title }: Props) => {
  const bg = useColorModeValue('blue.400', '#181b29')
  return (
    <Box w='full' bg={bg} rounded='lg' p={{ base: 4, lg: 6, xl: 6 }}>
      <Flex gap={3} align='center'>
        <NextLink href='/home' passHref>
          <Link>
            <BackIc width='30px' height='30px' />
          </Link>
        </NextLink>
        <Heading fontSize={{ base: 'sm', md: 'md', lg: 'xl', xl: '2xl' }} isTruncated>
          {title} ❤️
        </Heading>
      </Flex>
    </Box>
  )
}

export default HeaderRoom
