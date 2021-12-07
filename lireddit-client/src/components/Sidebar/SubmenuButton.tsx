import { Box, Flex, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface SubmenuButtonProps {
  isSeleted?: boolean;
  icon: any,
  text: string;
}
const SubmenuButton: React.FC<SubmenuButtonProps> = ({ isSeleted, icon, text }) => {
  const bgColorMode = isSeleted && useColorModeValue("#ddddee", "#292828");

  return (
    <Box
    cursor="pointer"
      borderRadius="50"
      mb={{
          base:"0px",
          xl:"4"
      }}
      bgColor={bgColorMode}
      pl={{
          xl: ""
      }}
      px={{
          base:"4"
      }}
      height={{
          base: "10",
          xl: "14"
      }}
    >
      <Flex alignItems="center" justifyContent="start" textAlign="start" height="full">
        {icon}
        {/* <Spacer width="2px" /> */}
        <Box display={{
            base: 'none',
            xl: "flex"
        }}>
          <Box width="6"></Box>
          <Text fontSize="xl" fontWeight="semibold">
            {text}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
export default SubmenuButton;
