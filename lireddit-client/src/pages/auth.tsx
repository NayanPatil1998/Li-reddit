import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import Image from "next/image";
import Register from "../components/register";
import { Text } from "@chakra-ui/react";
import Login from "../components/Login";
interface AuthProps {}
const Auth: React.FC<AuthProps> = ({}) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
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
              <Text  style={{cursor: "pointer"}} color="#0079d3" onClick={() => setIsLogin(false)}>
                Register
              </Text>
            </Text>
          ) : (
            <Text>
              Already Liredditor?{" "}
              <Text  as="button" style={{cursor: "pointer"}} color="#0079d3" onClick={() => setIsLogin(true)}>
                Login
              </Text>
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Auth;
