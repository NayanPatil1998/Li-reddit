import {
  Avatar,
  Box,
  Center,
  Flex,
  Link as ChakraLink,
  HStack,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Spinner,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { getTrendingSubs } from "../api/SubApi";
import { Container } from "../components/Container";
import PostsSection from "../components/PostsSection";
import MenuSidebar from "../components/Sidebar/MenuSidebar";
import Head from "next/head"
import PrimaryButton from "../components/Button";
import CreateSub from "../components/CreateSub";

const Index: FC = () => {

  return (
    <>
    <Head>
      <title>Lireddit</title>
    </Head>
    <Container display="flex">
      <MenuSidebar   />
      <PostsSection />
      <TrendingSubSection />
    </Container>
    </>
  );
};
export default Index;

const TrendingSubSection: FC = () => {
  const { colorMode } = useColorMode();

  const {
    isLoading,
    isError,
    isFetching,
    data: trendSubs,
    error,
    isFetched,
  } = useQuery("trendsubs", getTrendingSubs);

  const HeaderBgColor = { light: "primary", dark: "#fe4500" };
  return (
    <Box
      display={{
        base: "none",
        lg: "block",
      }}
      width="25em"
      style={{ marginTop: "30px" }}
    >
      {isLoading 
         ? (
          <Center height="full">
            <Spinner size="lg" />
          </Center>
        ) : isError || error ? (
          <Center height="full">
            <Text>Error while fetching Trending subs</Text>
          </Center>
        ) : (
          <VStack spacing="8">
            <Box
              borderTopLeftRadius="lg"
              borderTopRightRadius="lg"
              width="full"
              height="12"
              bgColor={HeaderBgColor[colorMode]}
              color="white"
            >
              <Center height="full">
                <Text fontWeight="bold" fontSize="md">
                  Trending Communities
                </Text>
              </Center>
            </Box>
            {trendSubs.data.map((sub) => (
              <Box width="90%" pl="sm" key={sub.name}>
                <HStack spacing="5" justifyContent="space-between">
                  <Flex>
                    {" "}
                    <Avatar src={sub.imageUrl} mr="6" size="sm" />
                    <ChakraLink>
                      <Link href={`/r/${sub.name}`}>
                        <Text fontSize="lg" fontWeight="bold">
                          {" "}
                          r/{sub.name}{" "}
                        </Text>
                      </Link>
                    </ChakraLink>
                  </Flex>
                  <Text>{sub.postCount}</Text>
                </HStack>
              </Box>
            ))}
            <CreateSub />
          </VStack>
        )}
    </Box>
  );
};
