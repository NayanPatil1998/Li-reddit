import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { register } from "../api/authApi";
import { toErrorMap } from "../utils/toErrorMap";
import InputTextField from "./InputTextField";
import { useRouter } from "next/router";
import { BASE_URL } from "../utils/constants";
import { useMutation } from "react-query";
interface RegisterProps {}
const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const {data: resData, isLoading, isError, isSuccess, error, mutate} = useMutation(register)

  return (
    <Box minW="sm">
      <Text fontSize="3xl">Sign up</Text>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          if (values.username.length == 0) setErrors({ username: "Required" });
          else if (values.email.length == 0) setErrors({ email: "Required" });
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

          
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputTextField
              name="username"
              placeholder="Enter Username"
              label="Username"
              required
            />
            <InputTextField
              name="email"
              placeholder="Enter Email"
              label="Email"
              type="email"
              required
            />
            <InputTextField
              name="password"
              placeholder="Enter Password"
              label="Password"
              type="password"
              required
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default Register;
