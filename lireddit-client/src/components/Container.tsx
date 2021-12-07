import { Flex, useColorMode, FlexProps } from '@chakra-ui/react'

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: '#ebebeb', dark: '#030303' }

  const color = { light: 'black', dark: 'white' }
  return (
    <Flex
      justifyContent="space-between"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  )
}
