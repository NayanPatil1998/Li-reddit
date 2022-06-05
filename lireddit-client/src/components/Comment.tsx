import {
  Box,
  Flex,
  IconButton,
  VStack,
  HStack,
  Link,
  Icon,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { FaRegCommentAlt, FaShare, FaRegBookmark } from "react-icons/fa";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { me } from "../api/authApi";
import { voteComment } from "../api/commentsApi";
import { votePost } from "../api/postApi";
import { Comment } from "../types/Comment";
import Image from "next/image";

interface CommentProps {
  postSlug: string;
  postIdentifier: string;
  comment: Comment;
}

const Comment: React.FC<CommentProps> = ({
  postSlug,
  comment,
  postIdentifier,
}) => {
  const bgColor = useColorModeValue("white", "#1a1a1b");
  const queryClient = useQueryClient();
  const { data: user } = useQuery("me", me);
  const toast = useToast();

  const { mutate } = useMutation(voteComment);

  const vote = (vote: number) => {
    mutate(
      {
        commentIdentifier: comment.identifier,
        postSlug: postSlug,
        postIdentifier: postIdentifier,
        value: vote,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(`${postSlug}/comments`);
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
  return (
    <Box
      width="full"
    //   justifySelf="start"
      px={{
        base: "0.5",
        md: "2",
      }}

    >
      <Flex
        flexDirection={{
          base: "column-reverse",
          md: "row",
        }}
      >
        <Flex
          m="2"
          flexDirection={{
            base: "row",
            md: "column",
          }}
          alignItems="center"
        >
          <IconButton
            onClick={() => user && vote(1)}
            size="sm"
            borderRadius="3xl"
            bgColor={comment.userVote === 1 && "#fe4500"}
            color={comment.userVote === 1 && "white"}
            aria-label="Search database"
            _hover={{
              bgColor: "#fe4500",
              color: "white",
            }}
            icon={<GoArrowUp />}
          />
          <Box
            height={{
              base: "3",
              md: "1",
            }}
            width={{
              base: "3",
              md: "1",
            }}
          />
          <Text fontSize="md">{comment.voteScore}</Text>
          <Box
            height={{
              base: "3",
              md: "1",
            }}
            width={{
              base: "3",
              md: "1",
            }}
          />

          <IconButton
            onClick={() => user && vote(-1)}
            size="sm"
            borderRadius="3xl"
            bgColor={comment.userVote === -1 && "blue"}
            color={comment.userVote === -1 && "white"}
            aria-label="Search database"
            _hover={{
              bgColor: "blue",
              color: "white",
            }}
            icon={<GoArrowDown />}
          />
        </Flex>
        <Box width="full" borderRadius="md" p="4" >
          <VStack>
            <HStack width="full">
              <Image width="25px" height="25px" src="/images/reddit-logo.png" />

              <Text
                fontSize="md"
                fontWeight="bold"
                _hover={{ textDecoration: "underline" }}
              >
                {" "}
                <Link href={`/u/${comment.username}`}>
                  <a>u/{comment.username}</a>
                </Link>
              </Text>
              <Text fontSize="sm" color="grey">
                <a>{dayjs(comment.createdAt).fromNow()}</a>
              </Text>
            </HStack>
            <Box width="full">
              <Text fontWeight="semibold" fontSize="lg">
                {comment.body}
              </Text>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Comment;
