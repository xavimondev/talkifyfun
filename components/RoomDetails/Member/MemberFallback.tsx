import { Avatar, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { Participant } from 'twilio-video'

import { getFullNameFromMember } from 'utils/getUserProfile'

type Props = {
  member: Participant
}

const MemberFallback = ({ member }: Props) => {
  const fullName = getFullNameFromMember(member)
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
        <Avatar name={fullName} size={sizeAvatar} />
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
          {fullName}
        </Text>
      </Flex>
    </>
  )
}

export default MemberFallback
