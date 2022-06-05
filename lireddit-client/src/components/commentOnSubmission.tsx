import {
    Box,
    Flex,
    IconButton,
    VStack,
    HStack,
    Icon,
    Text,
    useColorModeValue,
    useToast,
  } from "@chakra-ui/react";
  import dayjs from "dayjs";
  import React from "react";
  import { FaRegCommentAlt, FaShare, FaRegBookmark } from "react-icons/fa";
  import {RiMessage2Fill} from "react-icons/ri";
  import { useQueryClient, useMutation, useQuery } from "react-query";
  import { me } from "../api/authApi";
  import { voteComment } from "../api/commentsApi";
  import { votePost } from "../api/postApi";
  import { Comment } from "../types/Comment";
  import Image from "next/image";
  import Link from "next/link";
  
  interface CommentProps {
    postSlug: string;
    postIdentifier: string;
    subName: string;
    title: string;
    comment: Comment;
  }
  
  const CommentOnSubmission: React.FC<CommentProps> = ({
    postSlug,
    comment,
    subName,
    title,
    postIdentifier,
    
  }) => {
    const bgColor = useColorModeValue("white", "#1a1a1b");
    const queryClient = useQueryClient();
    const { data: user } = useQuery("me", me);
    const toast = useToast();
  
    return (
      <Box
        width="full"
      //   justifySelf="start"
        px={{
          base: "0.5",
          md: "2",
        }}
        bgColor={bgColor}
      >
        <Flex
            alignItems="center"
          flexDirection={{
            md: "row",
          }}
        >
            <Box display={{base: "none", md: "block"}}>
         <RiMessage2Fill display="none" size="30" />

            </Box>
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
                  <Link href={`/user/${comment.username}`}>
                    <a>u/{comment.username} </a>
                  </Link>
                </Text>
                <Text fontSize="sm" color="grey">
                  <a>commented on </a>
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  noOfLines={1}
                  maxWidth="sm"
                  _hover={{ textDecoration: "underline" }}
                >
                  {" "}
                  <Link href={`/r/${subName}/${postIdentifier}/${postSlug}`}>
                    <a> {title} </a>
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
  
  export default CommentOnSubmission;
  