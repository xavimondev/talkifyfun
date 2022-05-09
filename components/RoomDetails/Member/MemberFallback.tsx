import { Avatar, Flex, Text, useBreakpointValue } from '@chakra-ui/react'

type Props = {
  userIdentity: string
}

const MemberFallback = ({ userIdentity }: Props) => {
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
        width='50%'
        height='full'
        direction='column'
        gap={8}
        bg='#1A202C'
        p={8}
      >
        <Avatar name={full_name ?? userIdentity} size={sizeAvatar} />
        <Text
          fontSize={{
            base: 'sm',
            md: 'md',
            lg: '2xl',
            xl: '3xl'
          }}
          fontWeight='semibold'
          textAlign='center'
        >
          {full_name ?? userIdentity}
        </Text>
      </Flex>
    </>
  )
}

export default MemberFallback
