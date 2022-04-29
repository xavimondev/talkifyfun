import { Avatar, Flex, Text, useBreakpointValue } from '@chakra-ui/react'

type Props = {
  full_name: string
  avatar_url: string
}

const FallbackVideo = ({ full_name, avatar_url }: Props) => {
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
        width={{
          base: '100%',
          lg: '65%',
          xl: '75%'
        }}
        height={{
          base: '50%', // 0-48em
          lg: '100%',
          xl: '100%'
        }}
        direction='column'
        gap={8}
        bg='#1A202C'
      >
        <Avatar size={sizeAvatar} name={full_name} src={avatar_url} />
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
        {/* <ControlsRoom /> */}
      </Flex>
    </>
  )
}

export default FallbackVideo
