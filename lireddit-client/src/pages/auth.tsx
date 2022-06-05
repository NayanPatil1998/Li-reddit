import { Box, Center, Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import Image from "next/image";
import Register from "../components/register";
import { Spinner, Text } from "@chakra-ui/react";
import Login from "../components/Login";
import { useQuery } from "react-query";
import { me } from "../api/authApi";
import { useRouter } from "next/router";
import Head from "next/head";
interface AuthProps {}
const Auth: React.FC<AuthProps> = ({}) => {
  const [isLogin, setIsLogin] = useState(true);

  const { data: user, isLoading, isFetching } = useQuery("me", me);
  const router = useRouter();

  if (isLoading)
    return (
      <Flex height="100vh">
        <Center width="full">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </Flex>
    );

  if (user.data) router.replace("/");
  return !user.data && (
    <>
     <Head>
      <title>Login | Lireddit</title>
    </Head>
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      height="100vh"
    >
      <Box textAlign="center">
        <Image width="70px" height="70px" src="/images/reddit-logo.png" />
        {isLogin ? <Login /> : <Register />}
        <Box mt="4">
          {isLogin ? (
            <Text>
              New to Lireddit?{" "}
              <Text
                style={{ cursor: "pointer" }}
                color="#0079d3"
                onClick={() => setIsLogin(false)}
              >
                Register
              </Text>
            </Text>
          ) : (
            <Text>
              Already Liredditor?{" "}
              <Text
                as="button"
                style={{ cursor: "pointer" }}
                color="#0079d3"
                onClick={() => setIsLogin(true)}
              >
                Login
              </Text>
            </Text>
          )}
        </Box>
      </Box>
    </Box>
    </>
  );
};
export default Auth;
