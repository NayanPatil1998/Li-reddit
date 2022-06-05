import {
  Box,
  Center,
  Text,
  Spinner,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { isError, QueryClient, useQuery, useQueryClient } from "react-query";
import { fetchPost } from "../../../../api/postApi";
import CommentSection from "../../../../components/CommentSection";
import { Container } from "../../../../components/Container";
import Post from "../../../../components/Post";
import MenuSidebar from "../../../../components/Sidebar/MenuSidebar";

type Props = {};

const PostScreen = (props: Props) => {
  const router = useRouter();

  const { identifier, sub, slug } = router.query;
  const toast = useToast();

  const { colorMode } = useColorMode();
  const queryClient = useQueryClient()
  const bgColor = { light: "#ebebeb", dark: "#030303" };

  const color = { light: "black", dark: "white" };
  const HeaderBgColor = { light: "primary", dark: "#fe4500" };

  const {
    isLoading,
    data: post,
    error,
    isError,
    status,
    isFetching,
    isLoadingError,
  } = useQuery(
    slug,
    async () => {
      return await fetchPost(slug as string, identifier as string);
    },
    {
      // retry: 0,
      onError: (err: any) => {
        console.log("error happended");
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        router.back();
      },
    }
  );

  // const {data} =

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
    return (
      <Box
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        margin="2"
        h="100vh"
      >
        <Center height="full">
          <Text>Something Went Wrong!</Text>
        </Center>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Lireddit - {post.data.title}</title>
      </Head>

      <Container bg={bgColor[colorMode]} color={color[colorMode]} h="full" pt="6">
        <MenuSidebar />

        <VStack w={{ base: "full", lg: "50%" }}>
          <Post post={post.data} isOfPostScreen={true} onVoteChange={() =>queryClient.invalidateQueries(slug as string) } />
          <CommentSection postIdentifier={post.data.identifier} slug={post.data.slug} />
        </VStack>

        <Box
          display={{
            base: "none",
            lg: "block",
          }}
          width="25em"
          style={{ marginTop: "30px" }}
        ></Box>
      </Container>
    </>
  );
};

export default PostScreen;




