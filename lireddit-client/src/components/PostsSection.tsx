import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import { Button, Skeleton, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { getPosts } from "../api/postApi";
import Post from "./Post";
import { useQuery } from "react-query";

interface PostsSectionProps {
}
const PostsSection: React.FC<PostsSectionProps> = ({}) => {
  const { isLoading, isError, data, error, isFetched } = useQuery(
    "posts",
    getPosts
  );
  // console.log(data)
  return (
    <Box
      width={{
        base: "full",
        md: "55em",
      }}
      p="4"
    >
      {isError || error ? (
        <div>{error}</div>
      ) : (
        <VStack>
          {data &&
            data.data.map((post) => {
              return (
                <Skeleton key={post.identifier} w="full" isLoaded={!isLoading} >
                  
                  <Post  post={post} />
                </Skeleton>
              );
            })}
        </VStack>
      )}
    </Box>
  );
};
export default PostsSection;

interface FilterButtonProps {
  isSeleted?: boolean;
  icon: any;
  text: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  icon,
  text,
  isSeleted = false,
}) => {
  return (
    <Button
      bgColor={isSeleted ? "#fe4500" : "white"}
      textColor={isSeleted ? "white" : "black"}
      _hover={{ bg: "#fe4530", textColor: "white" }}
    >
      <Flex alignItems="center">
        {icon}
        <Box width="2" />
        <Text fontSize="lg" fontWeight="semibold">
          {isSeleted ? `${text} Posts` : text}
        </Text>
      </Flex>
    </Button>
  );
};

{
  /* <HStack
          width={{
            base: "100hv",
          }}
          display={{
            base: "none",
            md: "block",
          }}
          p="2"
          bgColor="white"
          borderRadius="lg"
          spacing="2"
          overflowX="auto"
        >
          <FilterButton
            icon={<Icon as={IoRocket} fontSize="20px" />}
            text="Best"
            isSeleted={true}
          />
          <FilterButton
            icon={<Icon as={AiFillFire} fontSize="20px" />}
            text="Hot"
          />

          <FilterButton
            icon={<Icon as={IoRocket} fontSize="20px" />}
            text="Best"
          />

          <FilterButton
            icon={<Icon as={IoRocket} fontSize="20px" />}
            text="Best"
          />
        </HStack>
        <Box
          display={{
            md: "none",
            base: "block",
          }}
        >
          <Menu>
            <MenuButton as={Button}  >
              <Icon as={AiOutlineUser} />
            </MenuButton>
            <MenuList>
              <MenuItem minH="48px" >
                <span>Fluffybuns the Destroyer</span>
              </MenuItem>
              <MenuItem minH="40px">
                <span>Simon the pensive</span>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box> */
}
