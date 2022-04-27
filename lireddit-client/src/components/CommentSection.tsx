import {
  Box,
  Center,
  Text,
  Spinner,
  useColorMode,
  useToast,
  VStack,
  useColorModeValue,
  Textarea,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { createRef, FC, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { me } from "../api/authApi";
import { fetchCommentsByPost, postComment } from "../api/commentsApi";
import Comment from "./Comment";

interface CommentSectionProps {
  postIdentifier: string;
  slug: string;
}

const CommentSection: FC<CommentSectionProps> = ({ slug, postIdentifier }) => {
  const toast = useToast();
  const { colorMode } = useColorMode();

  const bgColor = { light: "#ebebeb", dark: "#030303" };
  const bgColorCard = useColorModeValue("white", "#1a1a1b");

  const color = { light: "black", dark: "white" };
  const router = useRouter();

  const { data: user } = useQuery("me", me);

  const commentRef = createRef<HTMLTextAreaElement>();

  const { mutate } = useMutation(postComment);

  const queryClient = useQueryClient();

  const {
    isLoading,
    data: comments,
    error,
    isError,
    status,
    isFetching,
    isLoadingError,
  } = useQuery(
    `${slug}/comments`,
    async () => {
      return await fetchCommentsByPost(slug, postIdentifier);
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

      },
    }
  );

  const submitComment = () => {
    console.log(commentRef.current.value);
    if(commentRef.current.value === ""){
      toast({
        title: "Warning",
        description: "Comment field must not be empty",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });

      return 
    }
    mutate(
      {
        identifier: postIdentifier,
        slug: slug,
        body: commentRef.current.value,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          queryClient.invalidateQueries(`${slug}/comments`);
        },
        onError: (error) => {
          console.log(error);
          toast({
            title: "Error",
            description: "You have to login first",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      }
    );
  };

  if (isLoading || isFetching) {
    return (
      <Box bg={bgColor[colorMode]} color={color[colorMode]} margin="2">
        <Center height="full">
          <Spinner size="lg" />
        </Center>
      </Box>
    );
  }

  if (isError || status === "error") {
    return (
      <Box bg={bgColor[colorMode]} color={color[colorMode]} margin="2">
        <Center height="full">
          <Text>Error fetching comments!</Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box p="2" w="full">
      <VStack>
        <Box w="full" bgColor={bgColorCard} p="4">
          {user.data ? (
            <VStack spacing="4" alignItems="start">
              {" "}
              <Text mb="4">Comment as {user.data.username}</Text>
              <Textarea ref={commentRef} mb="4" placeholder="Add a comment" />
              <Button
                alignSelf={{
                  base: "end",
                  md: "start",
                }}
                onClick={submitComment}
                colorScheme="gray"
              >
                Comment
              </Button>{" "}
            </VStack>
          ) : (
            <Center w="full" h="20">
              <Link href="/auth">
                <a>
                  <Text>Login or register to comment</Text>
                </a>
              </Link>
            </Center>
          )}
        </Box>
        <Box w="full" bgColor={bgColorCard} p="4">
          <VStack alignSelf="start">
            <Text alignSelf="start" fontSize="md" fontWeight="bold">
              Comments
            </Text>
            {comments.data.map((comment) => (
              <Comment
                comment={comment}
                postSlug={slug}
                key={comment.identifier}
                postIdentifier={postIdentifier}
              />
            ))}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default CommentSection;
