import { Box, Flex, HStack, Spacer, VStack } from "@chakra-ui/layout";
import { Icon, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { FaRegCommentAlt, FaShare, FaRegBookmark } from "react-icons/fa";
import Image from "next/image";
import { Post } from "../types/post";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { votePost } from "../api/postApi";
import { me } from "../api/authApi";

dayjs.extend(relativeTime);

interface PostProps {
  post: Post;
}
const Post: React.FC<PostProps> = ({ post }) => {
  const bgColor = useColorModeValue("white", "#1a1a1b");
  const queryClient = useQueryClient()
  const { data: user } = useQuery("me", me);


  const {isLoading, isError, error, mutate} = useMutation(votePost)

  const vote = (vote: number) => {
    mutate({
      identifier: post.identifier,
      slug: post.slug,
      value: vote
  }, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries('posts')
      }
    });
  }

  return (
    <Box width="full" p={{
      base: "0.5",
      md:"4"
    }}>
      <Flex flexDirection={{
        base: "column-reverse",
        md: "row"
      }}>
        <Flex m="2" flexDirection={{
          base: "row",
          md:"column"
        }} alignItems="center" >
          <IconButton
          onClick={() =>  user &&  vote(1)}
          borderRadius="3xl" bgColor={post.userVote === 1 && "#fe4500"} color={post.userVote === 1 && "white"} aria-label="Search database" _hover={{
            bgColor:"#fe4500",
            color:"white"
          }} icon={<GoArrowUp />} />
          <Box height="3" width="3" />
          <Text fontSize="md">{post.voteScore}</Text>
          <Box height="3" width="3" />

          <IconButton onClick={() => user && vote(-1)} borderRadius="3xl" bgColor={post.userVote === -1 && "blue"} color={post.userVote === -1 && "white"} aria-label="Search database" _hover={{
            bgColor:"blue",
            color:"white"

          }} icon={<GoArrowDown />} />
        </Flex>
        <Box width="full" borderRadius="md" p="2" bgColor={bgColor}>
          <VStack>
            <HStack width="full">
              <Image width="25px" height="25px" src="/images/reddit-logo.png" />

              <Link href={`r/${post.subName}`}>
                <a>
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                  >
                    r/{post.subName}
                  </Text>
                </a>
              </Link>
              <Text fontSize="sm" color="grey">
                · Posted by
                <Link href={`u/${post.username}`}>
                  <a>u/{post.username}</a>
                </Link>
              </Text>
              <Text fontSize="sm" color="grey">
                <Link
                  href={`r/r/${post.subName}/${post.identifier}/${post.slug}`}
                >
                  <a>{dayjs(post.createdAt).fromNow()}</a>
                </Link>
              </Text>
            </HStack>
            <Box width="full">
              <Text fontWeight="bold" fontSize="2xl">
                {post.title}
              </Text>
              <Text noOfLines={2} fontSize="md">
                {post.body}
              </Text>
            </Box>
            <HStack width="full">
              <HStack  p="2" _hover={{cursor:"pointer", bgColor:"#e6e6e6" }}>
                <Icon color="grey" fontSize="20px" as={FaRegCommentAlt}  />
                <Text fontSize="md" fontWeight="bold" color="grey" >
                  {post.commentCount} Comments
                </Text>
              </HStack>
              <HStack  p="2" _hover={{cursor:"pointer", bgColor:"#e6e6e6" }}>
                <Icon color="grey" fontSize="20px" as={FaShare}  />
                <Text fontSize="md" fontWeight="bold" color="grey" >
                  Share
                </Text>
              </HStack>
              <HStack  p="2" _hover={{cursor:"pointer", bgColor:"#e6e6e6" }}>
                <Icon color="grey" fontSize="20px" as={FaRegBookmark}  />
                <Text fontSize="md" fontWeight="bold" color="grey" >
                  Save
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};
export default Post;
