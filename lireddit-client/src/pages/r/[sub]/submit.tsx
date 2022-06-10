import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  color,
  Flex,
  HStack,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { userInfo } from "os";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { me } from "../../../api/authApi";
import { createPost } from "../../../api/postApi";
import { getSub } from "../../../api/SubApi";
import PrimaryButton from "../../../components/Button";
import { Container } from "../../../components/Container";
import InputTextField from "../../../components/InputTextField";
import MenuSidebar from "../../../components/Sidebar/MenuSidebar";
import { toErrorMap } from "../../../utils/toErrorMap";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => {
  const toast = useToast();
  const router = useRouter();
  const { colorMode } = useColorMode();

  const bgColor = { light: "#ebebeb", dark: "#030303" };
  const HeaderBgColor = { light: "primary", dark: "#fe4500" };
  const color = { light: "black", dark: "white" };
  const { data: user, isLoading: userLoading } = useQuery("me", me);

  const subName = router.query.sub;
  const {
    isLoading: createPostLoading,
    isError: isCreatePostError,
    error,
    mutate,
  } = useMutation(createPost);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userLoading) {
      if (!user.data.email) {
        router.push("/auth");
      }
    }
  }, [userLoading]);

  const {
    isLoading,
    data: response,
    isFetching,
    isRefetching,
    isError,
    status,
  } = useQuery(
    subName,
    async () => {
      return await getSub(subName as string);
    },
    {
      // retry: 0,
      onError: (err: any) => {
        console.log("error happended");
      },
    }
  );

  if (isLoading || userLoading || !user) {
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
      {user.data.email && (
        <>
          <Head>
            <title>Submit to r/{subName}</title>
          </Head>

          <Container bg={bgColor[colorMode]} color={color[colorMode]} pt="24">
            <Box />
            <Flex direction="column" p="4" w={{ base: "full", lg: "40%" }}>
              <Text fontWeight="bold" fontSize="2xl" mb="2">
                Create Post
              </Text>
              <hr style={{ margin: "10px 0" }} />
              <Text fontSize="xl" mb="2">
                Submit post to r/{subName}
              </Text>

              <Formik
                initialValues={{ title: "", body: "" }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  if (values.title.length == 0)
                    setErrors({ title: "Required" });
                  else {
                    mutate(
                      {
                        subName: subName,
                        title: values.title,
                        body: values.body,
                      },
                      {
                        onSuccess: (responseData) => {
                          console.log(responseData);
                          if (responseData.status === 200) {
                            router.push(
                              `/r/${subName}/${responseData.data.identifier}/${responseData.data.slug}`
                            );
                            queryClient.invalidateQueries("posts");
                            queryClient.invalidateQueries(subName);
                          }
                        },
                      }
                    );
                  }

                  setSubmitting(false);
                }}
              >
                {({ values }) => (
                  <Form>
                    <Box position="relative">
                      <InputTextField
                        name="title"
                        placeholder="EnterTitle"
                        label="Title"
                        maxLength={300}
                      />
                      <Text pos="absolute" top={0} right={0}>
                        {values.title.length}/300
                      </Text>
                    </Box>

                    <InputTextField
                      name="body"
                      placeholder="Enter body"
                      label="Body"
                      isTextArea
                    />

                    <Button
                      mt={4}
                      color="white"
                      bgColor={HeaderBgColor[colorMode]}
                      paddingY="6"
                      width="full"
                      borderRadius="3xl"
                      isLoading={createPostLoading}
                      loadingText="Submitting"
                      type="submit"
                    >
                      Submit Post
                    </Button>
                  </Form>
                )}
              </Formik>
            </Flex>
            <Box
              display={{
                base: "none",
                xl: "block",
              }}
              // border="1px"
              rounded="lg"
              w="sm"
              h="sm"
            >
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
                      About Community
                    </Text>
                  </Center>
                </Box>
                <Box px="5">{response.data.description}</Box>
                {/* <HStack>
                <CalendarIcon />
                <Text>Created {dayjs(response.data.createdAt)}</Text>
              </HStack> */}
                {/* <PrimaryButton width="32" isBgDark={false} text="Create Post" /> */}
              </VStack>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default CreatePost;

// export const getServerSideProps : GetServerSideProps = async ({req, res}) => {
//   try {
//     const cookie = req.headers.cookie;
//     console.log(cookie)

//     return {props: {}}
//   } catch (error) {
//     res.writeHead(307, {location: "/auth"}).end()
//   }
// }
