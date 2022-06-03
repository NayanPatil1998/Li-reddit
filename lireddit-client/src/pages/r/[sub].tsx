import { CalendarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Spinner,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter,  } from "next/router";
import React, { ChangeEvent, createRef, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { me } from "../../api/authApi";
import { getSub, updateImage } from "../../api/SubApi";
import PrimaryButton from "../../components/Button";
import Post from "../../components/Post";
import MenuSidebar from "../../components/Sidebar/MenuSidebar";

type Props = {};

const Sub = (props: Props) => {
  const router = useRouter();

  const subName = router.query.sub;
  const [isError, setIsError] = useState(false);
  const [ownSub, setOwnSub] = useState(false);

  const fileInputRef = createRef<HTMLInputElement>();

  const queryClient = useQueryClient();

  const {
    isLoading: imageUploadLoading,
    isError: isImageUploadError,
    error: imageUploadError,
    mutate,
  } = useMutation(updateImage);

  const {
    isLoading: isUserLoading,
    isError: isErrorOfuser,
    data: user,
    error: errorOfUser,
  } = useQuery("me", me);

  const {
    isLoading,
    data: response,
    error,
    isRefetching,
    // isError,
    status,
    isFetching,
    isLoadingError,
  } = useQuery(
    subName,
    async () => {
      return await getSub(subName as string);
    },
    {
      // retry: 0,
      onError: (err: any) => {
        console.log("error happended");
        setIsError(true);
      },
    }
  );

  useEffect(() => {
    if (!isUserLoading && !isLoading && response.data && user.data) {
      setOwnSub(user.data.username === response.data.username);
    }
  }, [isLoading, isUserLoading]);

  // console.log(isError, error);
  const { colorMode } = useColorMode();

  const bgColor = { light: "#ebebeb", dark: "#030303" };

  const color = { light: "black", dark: "white" };
  const HeaderBgColor = { light: "primary", dark: "#fe4500" };

  // console.log(ownSub)
  const openFileInput = (
    type: string
  ) => {
    if (!ownSub) return;

    fileInputRef.current.name = type;
    fileInputRef.current.click();
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];

    mutate(
      {
        file,
        subName: response.data.name,
        type: fileInputRef.current.name,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          queryClient.invalidateQueries(response.data.name);
          router.reload();
        },
      }
    );
  };

  if (isLoading || isFetching || isRefetching || imageUploadLoading) {
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

  if (isError || status === "error" || isImageUploadError) {
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
      <title>{response.data.title}</title>
    </Head>
    <Flex
      direction="row"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      padding="4"
    >
      {/* <Flex></Flex> */}
      <MenuSidebar />

      <Flex direction="column" w={{ base: "full", lg: "70%" }}>
        <Box
          cursor={ownSub ? "pointer" : "default"}
          onMouseDown={(e) => openFileInput("banner")}
          height={{ base: "44", lg: "44" }}
          // mx={{
          //   base: "2",
          //   lg: "10",
          // }}
          my={{
            base: "4",
            lg: "6",
          }}
          style={
            response.data.bannerUrn && {
              backgroundImage: `url(http://localhost:3000/images/${response.data.bannerUrn})`,
              backgroundSize: "cover",
            }
          }
          bgColor={HeaderBgColor[colorMode]}
          color="white"
          width="full"
          rounded="xl"
        >
          <Box
            rounded="xl"
            // margin="2"
            width="full"
            style={
              response.data.bannerUrn && {
                background: "rgba(0, 0, 0, 0.6)",
                transition: "opacity 0.5s ease",
              }
            }
            height={{ base: "44", lg: "44" }}
            // bgColor="red"
          >
            {ownSub && (
              <input
                type="file"
                hidden={true}
                ref={fileInputRef}
                onChange={uploadImage}
              />
            )}
            <HStack height="full" justifyContent="center" spacing="8">
              {!response.data.imageUrn ? (
                <Box
                  cursor={ownSub ? "pointer" : "default"}
                  onMouseDown={(e) => {
                    e.stopPropagation();

                    openFileInput("image")}}
                  bgColor={colorMode === "light" ? "primary" : "#fe4500"}
                  rounded="full"
                  borderColor="white"
                  border="4px"
                  w="20"
                  h="20"
                >
                  <Center h="full">
                    <Text fontSize="3xl" fontWeight="bold">
                      r/
                    </Text>
                  </Center>
                </Box>
              ) : (
                <Avatar
                  cursor={ownSub ? "pointer" : "default"}
                  onMouseDown={(e) => {
                    e.stopPropagation();

                    openFileInput("image");
                  }}
                  size="lg"
                  src={`http://localhost:3000/images/${response.data.imageUrn}`}
                />
              )}

              <VStack spacing="0.5">
                <Text fontWeight="bold" fontSize="2xl">
                  {response.data.title}
                </Text>
                <Text alignSelf="start" fontWeight="bold">
                  r/{response.data.name}
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Box>

        <HStack alignItems="start">
          <VStack w={{ base: "full", xl: "70%" }}>
            {response.data &&
              response.data.posts.map((post) => {
                return <Post key={post.identifier}sub={post.subName} post={post} />;
              })}
          </VStack>
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
              <HStack>
                <CalendarIcon />
                <Text>Created {dayjs(response.data.createdAt).fromNow()}</Text>
              </HStack>
              <PrimaryButton onClick={() => {
                router.push(`/r/${subName}/submit`)
              }} width="32" isBgDark={false} text="Create Post" />
            </VStack>
          </Box>
        </HStack>
      </Flex>

      {/* <Box width="full" height="40"></Box> */}
    </Flex>
    </>
  );
};

export default Sub;
