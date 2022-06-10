import { Box, Center, Flex, HStack, Spacer } from "@chakra-ui/layout";
import {
  Button,
  Avatar,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  Link as ChakraLink,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useColorModeValue,
  useMediaQuery,
  CloseButton,
} from "@chakra-ui/react";
import { AiFillMessage, AiOutlineUser } from "react-icons/ai";
import NextLink from "next/link";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import { DarkModeSwitch } from "./DarkModeSwitch";
import PrimaryButton from "./Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { logout, me } from "../api/authApi";
import { useRouter } from "next/router";
import axios, { CancelTokenSource } from "axios";
import { SubReddit } from "../types/sub";
import { isEmpty } from "lodash";
import { BASE_URL } from "../utils/constants";
import CreateSub from "./CreateSub";
interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = ({}) => {
  const searchInputBgColorMode = useColorModeValue("white", "#212122");
  const searchInputTextColorMode = useColorModeValue("black", "white");
  const [toShowSearchArea, setToShowSearchArea] = useState(false);
  const bgColorMode = useColorModeValue("white", "#1a1a1b");
  const [subResults, setSubResults] = useState<SubReddit[]>([]);
  const { isLoading, isError, data: user, error } = useQuery("me", me);
  const { mutate } = useMutation(logout);
  const queryClient = useQueryClient();
  const [isLargerThanMd] = useMediaQuery("(min-width: 52em)");
  const router = useRouter();

  if (isLoading) {
    return <Box></Box>;
  }

  if (isError) {
    return <Box></Box>;
  }
  let cancelToken: CancelTokenSource;

  const search = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const q = e.target.value;

    if (isEmpty(q.trim())) {
      setToShowSearchArea(false);
      setSubResults([]);
      return;
    }

    setToShowSearchArea(true);

    if (typeof cancelToken !== typeof undefined) {
      cancelToken.cancel("Cancelling the previous req");
    }

    cancelToken = axios.CancelToken.source();

    // const response = await searchsubs(q, cancelToken);
    const response = await axios.get<SubReddit[]>(
      `${BASE_URL}subreddits/search/${q}`,
      { cancelToken: cancelToken.token }
    );
    // console.table(response.data)

    if (response.status === 200) {
      setSubResults(response.data);
    }
  };

  return (
    <Box as="nav" width="100%" bgColor={bgColorMode} pos="fixed" zIndex={1000}>
      <Flex
        p="3"
        justifyContent={{
          base: "space-around",
          xl: "space-between",
        }}
      >
        <NextLink href="/">
          <Flex style={{ cursor: "pointer" }}>
            <Image width="40px" height="35px" src="/images/reddit-logo.png" />
            <Spacer width="2" />
            <Text
              display={{
                base: "none",
                md: "block",
              }}
              fontWeight="semibold"
              fontSize="2xl"
            >
              Lireddit
            </Text>
          </Flex>
        </NextLink>
        <InputGroup
          pos="relative"
          display={{ base: "none", xl: "block" }}
          width={{
            base: "13em",
            sm: "sm",
            md: "xl",
            xl: "2xl",
          }}
        >
          {toShowSearchArea && (
            <Box
              zIndex="unset"
              p={"4"}
              bgColor={bgColorMode}
              pos="absolute"
              top="100%"
              w="full"
              minHeight="20"
            >
              {isLoading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                subResults.map((sub) => (
                  <Box width="90%" pl="sm" key={sub.name}>
                    <Flex>
                      {" "}
                      <Avatar src={sub.imageUrn} mr="6" size="sm" />
                      <ChakraLink
                        onClick={() => {
                          setSubResults([]);
                          setToShowSearchArea(false);
                        }}
                      >
                        <NextLink href={`/r/${sub.name}`}>
                          <Text fontSize="lg" fontWeight="bold">
                            {" "}
                            r/{sub.name}{" "}
                          </Text>
                        </NextLink>
                      </ChakraLink>
                    </Flex>
                  </Box>
                ))
              )}
              <CloseButton
                pos="absolute"
                top="1"
                right="1"
                onClick={() => {
                  setToShowSearchArea(false);
                }}
              />
            </Box>
          )}

          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            onFocus={(e) => {
              if (e.currentTarget === e.target) {
                setSubResults([]);
                setToShowSearchArea(true);
              }
            }}
            onBlur={(e) => {
              if (e.currentTarget === e.target) {
                console.log(e.timeStamp);
              } else {
                setToShowSearchArea(false);
                setSubResults([]);
              }
            }}
            onChange={search}
            placeholder="Search Lireddit"
            textColor={searchInputTextColorMode}
            bgColor={searchInputBgColorMode}
          />
        </InputGroup>
        {user.data ? (
          <Flex alignItems="center">
            <DarkModeSwitch
              display={{
                base: "none",
                md: "block",
              }}
            />
            <Spacer width="5" />
            <CreateSub
              display={{
                base: "none",
                md: "block",
              }}
            />
            <Spacer width="5" />

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Icon as={AiOutlineUser} />
              </MenuButton>
              {!isLargerThanMd ? (
                <MenuList>
                  <MenuItem justifyContent="center">
                    Dark Mode <DarkModeSwitch ml="8" />
                  </MenuItem>
                  <MenuItem justifyContent="center">
                    <CreateSub />
                  </MenuItem>
                  <MenuItem
                    justifyContent="center"
                    onClick={() => router.push(`/user/${user.data.username}`)}
                  >
                    <Text>Profile</Text>
                  </MenuItem>
                  <MenuItem
                    justifyContent="center"
                    onClick={() => {
                      mutate(
                        {},
                        {
                          onSuccess: (data) => {
                            queryClient.invalidateQueries("me");
                            router.reload();
                          },
                        }
                      );
                    }}
                    minH="40px"
                  >
                    <span>Logout</span>
                  </MenuItem>
                </MenuList>
              ) : (
                <MenuList>
                  <MenuItem
                    justifyContent="center"
                    onClick={() => router.push(`/user/${user.data.username}`)}
                  >
                    <Text>Profile</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      mutate(
                        {},
                        {
                          onSuccess: (data) => {
                            console.log(data);
                            queryClient.invalidateQueries("me");
                            router.reload();
                          },
                        }
                      );
                    }}
                    justifyContent="center"
                  >
                    <Text>Logout</Text>
                  </MenuItem>
                </MenuList>
              )}
            </Menu>
          </Flex>
        ) : (
          <Flex alignItems="center">
            <Box
              alignItems="center"
              display={{
                base: "none",
                xl: "flex",
              }}
            >
              <DarkModeSwitch />
              <NextLink href="/auth" as="/auth">
                <Link>
                  <PrimaryButton isBgDark={true} text="Log in" />
                </Link>
              </NextLink>
              <Spacer width="5" />
              <NextLink href="/auth">
                <Link>
                  <PrimaryButton isBgDark={false} text="Sign up" />
                </Link>
              </NextLink>
              <Spacer width="5" />
            </Box>
            <Box display={{ base: "block", xl: "none" }}>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <Icon as={AiOutlineUser} />
                </MenuButton>
                <MenuList>
                  <MenuItem justifyContent="center">
                    Dark Mode <DarkModeSwitch ml="8" />
                  </MenuItem>
                  <MenuItem justifyContent="center">
                    <NextLink href="/auth" as="/auth">
                      <Link>
                        <PrimaryButton isBgDark={true} text="Log in" />
                      </Link>
                    </NextLink>
                  </MenuItem>
                  <MenuItem justifyContent="center">
                    <NextLink href="/auth">
                      <Link>
                        <PrimaryButton isBgDark={false} text="Sign up" />
                      </Link>
                    </NextLink>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
export default Navbar;
