import { Avatar, Flex, Text, useBreakpointValue } from '@chakra-ui/react'

type Props = {
  userIdentity: string
}

const FallbackVideo = ({ userIdentity }: Props) => {
  // User identity seems like: 3094809384-23232-232323|Mi name
  const full_name = userIdentity?.split('|')[1]
  const sizeAvatar = useBreakpointValue({
    base: 'sm',
    md: 'md',
    lg: 'xl',
    xl: '2xl'
  })

  return (
    <>
      <Flex
        borderRadius={10}
        overflow='hidden'
        justifyContent='center'
        alignItems='center'
        width='full'
        height='full'
        direction='column'
        gap={8}
        bg='#1A202C'
      >
        <Avatar name={full_name} size={sizeAvatar} />
        <Text
          fontSize={{
            base: 'md',
            lg: '2xl',
            xl: '3xl'
          }}
          fontWeight='semibold'
        >
          {full_name}
        </Text>
      </Flex>
    </>
  )
}

export default FallbackVideo
