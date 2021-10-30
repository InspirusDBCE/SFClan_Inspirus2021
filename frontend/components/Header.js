import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useAuth from "../contexts/auth";
import Link from "./Link";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useAuth();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link href="/">
            <Flex alignItems="center">
              <img src="/icons/icon-72x72.png" alt="Logo" width="24" />
              <Box pl={2}>App Name</Box>
            </Flex>
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      user
                        ? "https://avatars.dicebear.com/api/male/username.svg"
                        : ""
                    }
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  {user ? (
                    <>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>{user}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <Link href="/bus/dashboard">
                        <MenuItem>Dashboard</MenuItem>
                      </Link>
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </>
                  ) : (
                    <Link href="/bus/login">
                      <MenuItem>Bus Manager</MenuItem>
                    </Link>
                  )}

                  <Link href="/public">
                    <MenuItem>Public</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
