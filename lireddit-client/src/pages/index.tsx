import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { FC } from "react";
import { Container } from "../components/Container";
import PostsSection from "../components/PostsSection";
import MenuSidebar from "../components/Sidebar/MenuSidebar";

const Index: FC = () => {

  return (
    <Container display="flex">
        <MenuSidebar />
        <PostsSection />
        <Box display={{
          base:"none",
          lg: "block"
        }} width="25em"></Box>
    </Container>
  );
};
export default Index;
