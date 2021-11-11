import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import InputTextField from "./InputTextField";

interface RegisterProps {}
const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <Box minW="sm">
      <Text fontSize="3xl">
          Sign up
      </Text>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
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
          <Form>
            <InputTextField
              name="username"
              placeholder="Enter Username"
              label="Username"
            />
            <InputTextField
              name="email"
              placeholder="Enter Email"
              label="Email"
              type="email"
            />
            <InputTextField
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
              isLoading={isSubmitting}
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
