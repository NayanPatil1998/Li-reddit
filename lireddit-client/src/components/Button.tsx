import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface ButtonProps {
  width: string,
  isBgDark: boolean,
  text: string,
  onClick?: React.MouseEventHandler<HTMLDivElement>
    
}
const PrimaryButton: React.FC<ButtonProps> = ({isBgDark, text, width, onClick}) => {

  const buttonColorMode = isBgDark ? useColorModeValue('white', 'black') : useColorModeValue('primary', '#d7dadc')
  const buttonTextColorMode = isBgDark ? useColorModeValue('primary', 'white') : useColorModeValue('white', 'black')


  return (
    <Box
    onClick={onClick}
      bgColor={buttonColorMode}
      textColor={buttonTextColorMode}
      height="8"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
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
