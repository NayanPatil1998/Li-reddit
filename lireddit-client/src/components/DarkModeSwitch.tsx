import { useColorMode, Switch } from '@chakra-ui/react'

export const DarkModeSwitch = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Switch
      right="1rem"
      color="green"
      isChecked={isDark}
      {...props}
      onChange={toggleColorMode}
      
    />
  )
}
