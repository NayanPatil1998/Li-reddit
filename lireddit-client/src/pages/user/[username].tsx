import { FaBirthdayCake } from "react-icons/fa";
import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  useColorModeValue,
  VStack,
  Text,
  Spinner,
  HStack,
  Avatar,
  Skeleton,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUserSubmissions, me } from "../../api/authApi";
import { Container } from "../../components/Container";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import CommentOnSubmission from "../../components/commentOnSubmission";
import Head from "next/head";
import { DateFormatOptions } from "../../utils/constants";

interface UserScreenProps {}

const UserScreen: React.FC<UserScreenProps> = () => {
  const router = useRouter();
  const username = router.query.username;
  const [dateString, setDateString] = useState("");
  const { colorMode } = useColorMode();

  const bgColor = { light: "#ebebeb", dark: "#030303" };
  const HeaderBgColor = { light: "primary", dark: "#fe4500" };
  const color = { light: "black", dark: "white" };
  const bgColorMode = useColorModeValue("white", "#1a1a1b");

  const {
    isLoading,
    data: response,

    isError,
    status,
  } = useQuery(
    username,
    async () => {
      return await getUserSubmissions(username as string);
    },
    {
      // retry: 0,
      onError: (err: any) => {
        console.log("error happended");
      },
    }
  );

  useEffect(() => {
    if (!isLoading) {
      let date = new Date(response.data.user.createdAt);

      setDateString(date.toLocaleDateString("en-US", DateFormatOptions));
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <Box
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        margin="2"
        h="100vh"
      >
        <Center height="full">
          <Spinner size="lg" />
        </Center>
      </Box>
    );
  }

  if (isError || status === "error") {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>
          {username} (u/{username})
        </title>
      </Head>
      <Container
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        pt="20"
        w="full"
        flexDir={{ base: "column-reverse", xl: "row" }}
      >
        <Box
          width={{
            base: "full",
            md: "55em",
          }}
          p="4"
        >
          <VStack>
            <Text fontSize="2xl" fontWeight="bold">
              Activity
            </Text>
            <Tabs
              m="2"
              variant="solid-rounded"
              align="center"
              width={{
                base: "full",
                md: "55em",
              }}
              // p="4"
            >
              <TabList>
                <Tab
                  m="2"
                  _selected={{ color: "white", bg: HeaderBgColor[colorMode] }}
                >
                  Posts
                </Tab>
                <Tab
                  m="2"
                  _selected={{ color: "white", bg: HeaderBgColor[colorMode] }}
                >
                  Comments
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box>
                    <VStack>
                      {response &&
                        response.data.submissions.posts.map((post) => {
                          return (
                            <Skeleton
                              key={post.identifier}
                              w="full"
                              isLoaded={!isLoading}
                            >
                              <Post post={post} />
                            </Skeleton>
                          );
                        })}
                    </VStack>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box>
                    <VStack>
                      {response.data.submissions.comments.map((comment) => (
                        <CommentOnSubmission
                          title={comment.post.title as string}
                          subName={comment.post.subName}
                          comment={comment as any}
                          postSlug={comment.post.slug as string}
                          key={comment.identifier}
                          postIdentifier={comment.post.identifier as string}
                        />
                      ))}
                    </VStack>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Box>

        <Center
        al
          // border="1px"
          // display={{ base: "none" }}
          rounded="lg"
          w={{base: "full", md: "sm"}}
          h="sm"
          p="2"
          border="1px"
          borderColor={color[colorMode]}
        >
          <VStack spacing="8">
            {/* <Box
              borderTopLeftRadius="lg"
              borderTopRightRadius="lg"
              width="full"
              height="12"
              bgColor={HeaderBgColor[colorMode]}
              color="white"
            >
              <Center height="full">
                <Text fontWeight="bold" fontSize="md">
                  About
                </Text>
              </Center>
            </Box> */}
            <VStack>
              <Avatar
                size="xl"
                src="https://i.redd.it/snoovatar/avatars/c52c5d57-bc6c-41d4-818b-03e8e26e8bc4.png"
              />
              <Text fontSize="2xl" fontWeight="bold">
                {response.data.user.username}
              </Text>
              <Text fontSize="md" color="gray">
                u/{response.data.user.username} ·{" "}
                {dayjs(response.data.user.createdAt).fromNow()}
              </Text>
              <HStack>
                <FaBirthdayCake /> <Text fontSize="lg"> Cake day</Text>
              </HStack>
              {/* @ts-nocheck */}
              <Text fontSize="md" color="gray">
                {dateString}
              </Text>
            </VStack>

            {/* {/* <PrimaryButton width="32" isBgDark={false} text="Create Post" /> */}
          </VStack>
        </Center>
      </Container>
    </>
  );
};

export default UserScreen;
