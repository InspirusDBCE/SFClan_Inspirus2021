import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function BusIndexPage() {
  return (
    <Container centerContent minH="100vh" bg="blue.400">
      <Flex height="100vh" alignItems="center">
        <VStack spacing={8}>
          <Heading>Bus</Heading>

          <Link href="/bus/login">
            <Button>Login</Button>
          </Link>

          <Link href="/bus/register">
            <Button>Register</Button>
          </Link>
        </VStack>
      </Flex>
    </Container>
  );
}
