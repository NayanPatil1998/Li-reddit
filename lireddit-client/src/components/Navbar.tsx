import { Box, Flex, Spacer } from "@chakra-ui/layout";
import {
  Button,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillMessage, AiOutlineUser } from "react-icons/ai";
import NextLink from "next/link";
import React from "react";
import Image from "next/image";
import { ChevronDownIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import { DarkModeSwitch } from "./DarkModeSwitch";
import PrimaryButton from "./Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { logout, me } from "../api/authApi";
import { useRouter } from "next/router";
interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = ({}) => {
  const searchInputBgColorMode = useColorModeValue("white", "#212122");
  const searchInputTextColorMode = useColorModeValue("black", "white");
  const bgColorMode = useColorModeValue("white", "#1a1a1b");

  const { isLoading, isError, data: user, error } = useQuery("me", me);
  const { mutate } = useMutation(logout);
  const queryClient = useQueryClient();
  const router = useRouter();

  if (isLoading) {
    return <Box></Box>;
  }

  if (isError ) {
    return (
      <Box>
       
      </Box>
    )
  }

  return (
    <Box as="nav" width="100%" bgColor={bgColorMode} position="sticky">
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
          width={{
            base: "13em",
            sm: "sm",
            md: "xl",
            xl: "2xl",
          }}
        >
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            placeholder="Search Lireddit"
            textColor={searchInputTextColorMode}
            bgColor={searchInputBgColorMode}
          />
        </InputGroup>
        {user.data ? (
          <Flex
            alignItems="center"
            display={{
              base: "none",
              xl: "flex",
            }}
          >
            <DarkModeSwitch />
            <PrimaryButton width="32" isBgDark={false} text="Post" />
            <Spacer width="5" />
            <IconButton
              aria-label="Messaging"
              size="md"
              fontSize={23}
              icon={<Icon as={AiFillMessage} />}
            />
            <Spacer width="5" />

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Icon as={AiOutlineUser} />
              </MenuButton>
              <MenuList>
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
                  minH="40px"
                >
                  <span>Logout</span>
                </MenuItem>
              </MenuList>
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
                  <PrimaryButton width="32" isBgDark={true} text="Log in" />
                </Link>
              </NextLink>
              <Spacer width="5" />
              <NextLink href="/auth">
                <Link>
                  <PrimaryButton width="32" isBgDark={false} text="Sign up" />
                </Link>
              </NextLink>
              <Spacer width="5" />
            </Box>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Icon as={AiOutlineUser} />
              </MenuButton>
              <MenuList>
                <MenuItem minH="48px">
                  <span>Fluffybuns the Destroyer</span>
                </MenuItem>
                <MenuItem minH="40px">
                  <span>Simon the pensive</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
export default Navbar;
