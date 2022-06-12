import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { login } from "../api/authApi";
import { toErrorMap } from "../utils/toErrorMap";
import InputTextField from "./InputTextField";

interface LoginProps {}
const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter()
  const {isLoading, isError, error, mutate} = useMutation(login)
  const queryClient = useQueryClient()

  return (
    <Box minW="sm">
      <Text fontSize="3xl">
          Log in
      </Text>
      <Formik
        initialValues={{ emailOrUsername: "", password: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          if (values.emailOrUsername.length == 0) setErrors({ emailOrUsername: "Required" });
          else if (values.password.length == 0)
            setErrors({ password: "Required" });
          else {
            console.log(values)

            mutate(values, {
              onSuccess: (data) => {
                console.log(data);
                if (data.data?.errors) {
                  setErrors(toErrorMap(data.data.errors as []));
                } else if (data.data.user) {
                  queryClient.invalidateQueries('me')
                  router.push("/");
                }
              }
            });

          
         
            // await executeRegister({data: values})
            // mutate(values, {
            //   onError(err) {
            //     console.log(err);
            //   },
            // });
          }

          
          //   const response = await register({ options: values });
          //   if (response.data?.register.errors) {
          //     setErrors(toErrorMap(response.data.register.errors));
          //   } else if (response.data?.register.user) {
          //     router.push("/");
          //   }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Box px={{base: "6", md:"0"}}>
            <Form >
            <InputTextField
            // @ts-ignore
              name="emailOrUsername"
              placeholder="Enter Username or Email"
              label="Username or Email"
            />
            <InputTextField
            // @ts-ignore
              name="password"
              placeholder="Enter Password"
              label="Password"
              type="password"
            />

            <Button
              mt={4}
              color="white"
              bgColor="#0079d3"
              paddingY="6"
              width="full"
              borderRadius="3xl"
              isLoading={isLoading}
              loadingText="Submitting"
              type="submit"
            >
              Login
            </Button>
          </Form>
          </Box>
        )}
      </Formik>
    </Box>
  );
};
export default Login;
