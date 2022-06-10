import { Box, Flex } from "@chakra-ui/layout";
import { Icon, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoPlanetSharp, IoTrendingUp } from "react-icons/io5";
import SubmenuButton from "./SubmenuButton";

interface MenuSidebarProps {
}
const MenuSidebar: React.FC<MenuSidebarProps> = ({}) => {
  const { colorMode } = useColorMode();
  const [typeOfPosts, setTypeOfPosts] = useState<"home" | "trending">("home");
  const bgColor = { light: "#ebebeb", dark: "#030303" };
  return (
    <Box
      bgColor={bgColor[colorMode]}
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
      p={5}
      //   bgColor="teal"
    >
      <Flex
        direction={{
          base: "row",
          xl: "column",
        }}
        justifyContent="space-evenly"
      >
        <SubmenuButton
          onClick={() => { if(typeOfPosts != "home")setTypeOfPosts("home")}}
          icon={<Icon fontSize="30px" as={IoPlanetSharp} color="#fe4500" />}
          text="Home"
          isSeleted={typeOfPosts === "home"}
        />
        <SubmenuButton
          onClick={() => { if(typeOfPosts != "trending")setTypeOfPosts("trending")}}
          isSeleted={typeOfPosts === "trending"}

          icon={<Icon fontSize="30px" as={IoTrendingUp} color="#fe4500" />}
          text="Popular"
        />
      </Flex>
    </Box>
  );
};
export default MenuSidebar;
