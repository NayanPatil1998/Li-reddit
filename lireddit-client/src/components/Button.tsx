import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface ButtonProps {
  width: string,
  isBgDark: boolean,
  text: string
    
}
const PrimaryButton: React.FC<ButtonProps> = ({isBgDark, text, width}) => {

  const buttonColorMode = isBgDark ? useColorModeValue('white', 'black') : useColorModeValue('primary', '#d7dadc')
  const buttonTextColorMode = isBgDark ? useColorModeValue('primary', 'white') : useColorModeValue('white', 'black')


  return (
    <Box
      bgColor={buttonColorMode}
      textColor={buttonTextColorMode}
      height="8"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontWeight="bold"
      width={width}
      borderColor={buttonTextColorMode}
      borderWidth="thin"
      borderRadius="3xl"
    >
     {text}
    </Box>
  );
};
export default PrimaryButton;
