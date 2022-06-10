import {
  useDisclosure,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useColorMode,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { createSub } from "../api/SubApi";
import { toErrorMap } from "../utils/toErrorMap";
import PrimaryButton from "./Button";
import InputTextField from "./InputTextField";


const CreateSub: React.FC = (props :any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const bgColor = { light: "#ebebeb", dark: "#030303" };
  const HeaderBgColor = { light: "primary", dark: "#fe4500" };
  const color = { light: "black", dark: "white" };

  const {
    isLoading: createSubLoading,
    isError: isCreateSubError,
    error,
    mutate,
  } = useMutation(createSub);

  return (
    <Box {...props}>
      <PrimaryButton
        onClick={onOpen}
        isBgDark={false}
        text="Create Community"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay p="4" />
        <ModalContent bgColor={bgColor[colorMode]}>
          <ModalHeader>Create Community</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" w="full">
              <hr style={{ margin: "10px 0" }} />

              <Formik
                initialValues={{ title: "", name: "", description: "" }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  console.log(values);
                  if (values.title.length == 0)
                  setErrors({ title: "Required" });
                else if (values.name.length == 0)
                  setErrors({ name: "Required" });
                else if (values.description.length == 0)
                  setErrors({ description: "Required" });
                else {

                  mutate(values, {
                    // onError:(er) => {
                        
                    // },
                    onSuccess: (responseData) => {
                        console.log(responseData.data?.errors)
                        if (responseData.data?.errors) {
                          setErrors(toErrorMap(responseData.data.errors as []));
                        }
                        if (responseData.status === 200) {
                          onClose()
                          router.push(
                            `/r/${responseData.data.name}`
                          );
                        }
                    },
                  });
                  setSubmitting(false);
                }}
            }

              >
                {({}) => (
                  <Form>
                    <InputTextField
                      //   @ts-ignore
                      name="name"
                      placeholder="Enter Name"
                      label="Name"
                      maxLength={300}
                    />

                    <InputTextField
                      //   @ts-ignore
                      name="title"
                      placeholder="Enter Title"
                      label="Title"
                      maxLength={300}
                    />

                    <InputTextField
                      //   @ts-ignore
                      name="description"
                      placeholder="Enter Description"
                      label="Description"
                      isTextArea
                    />

                    <Button
                      mt={4}
                      color="white"
                      bgColor={HeaderBgColor[colorMode]}
                      paddingY="6"
                      width="full"
                      borderRadius="3xl"
                      isLoading={createSubLoading}
                      loadingText="Submitting"
                      type="submit"
                    >
                      Create
                    </Button>
                  </Form>
                )}
              </Formik>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} variant="ghost">
              Cancel
            </Button>
            {/* <Button bgColor={HeaderBgColor[colorMode]} color="white">Create</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateSub;
