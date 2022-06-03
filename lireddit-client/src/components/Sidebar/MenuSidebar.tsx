import { Box, Flex } from "@chakra-ui/layout";
import { Icon, useColorMode } from "@chakra-ui/react";
import React from "react";
import { IoPlanetSharp, IoTrendingUp, IoNotificationsCircleSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import SubmenuButton from "./SubmenuButton";

interface MenuSidebarProps {}
const MenuSidebar: React.FC<MenuSidebarProps> = ({}) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "#ebebeb", dark: "#030303" };
  return (
    <Box
    bgColor={bgColor[colorMode]}

    
        // zIndex={{
        //     base: "-1",
        //     xl: '1'
        // }}
        // sx={{ position: '-webkit-sticky', bottom: '0', }}
      width={{
        base: "full",
        xl: "20em",
      }}    
      height={{
        base: "70px",
        xl: "full",
      }}
      position={{
        base: "fixed",
        xl: "sticky",
      }}
      bottom={{ base: "0px" }}
      p={5 }
      //   bgColor="teal"
    >
      <Flex direction={{
          base : "row",
          xl:"column"
      }} justifyContent="space-evenly" >
        <SubmenuButton icon={<Icon fontSize="30px" as={IoPlanetSharp} color="#fe4500" />} text="Home" isSeleted={true} />
        <SubmenuButton icon={<Icon fontSize="30px" as={IoTrendingUp} color="#fe4500" />} text="Popular" />
        <SubmenuButton icon={<Icon fontSize="30px" as={IoNotificationsCircleSharp} color="#fe4500" />} text="Notifications" />
      </Flex>
    </Box>
  );
};
export default MenuSidebar;
