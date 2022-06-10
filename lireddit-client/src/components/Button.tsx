import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface ButtonProps {
  isBgDark: boolean,
  text: string,
  onClick?: React.MouseEventHandler<HTMLDivElement>
    
}
const PrimaryButton: React.FC<ButtonProps> = ({isBgDark, text, onClick}) => {

  const buttonColorMode = isBgDark ? useColorModeValue('white', 'black') : useColorModeValue('primary', '#d7dadc')
  const buttonTextColorMode = isBgDark ? useColorModeValue('primary', 'white') : useColorModeValue('white', 'black')


  return (
    <Box
    onClick={onClick}
      bgColor={buttonColorMode}
      textColor={buttonTextColorMode}
      height="8"
      px="4"
      py="2"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      fontWeight="bold"
      borderColor={buttonTextColorMode}
      borderWidth="thin"
      borderRadius="3xl"
    >
     {text}
    </Box>
  );
};
export default PrimaryButton;
