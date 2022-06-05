import { Flex, useColorMode, FlexProps, HStack } from '@chakra-ui/react'

export const Container = (props: any) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: '#ebebeb', dark: '#030303' }

  const color = { light: 'black', dark: 'white' }
  return (
    <HStack
      justifyContent="center"
      alignItems="start"
      spacing={{lg: 8}}
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      minH="91vh"

      {...props}
    > 
    {props.children}
    
    </HStack>
  )
}
