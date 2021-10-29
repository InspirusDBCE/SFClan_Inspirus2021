import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Container centerContent minH="100vh">
      <Flex height="100vh" alignItems="center">
        <VStack spacing={8}>
          <Image
            src="/icons/icon-72x72.png"
            width={72}
            height={72}
            alt="Logo"
          />

          <Heading>App Name</Heading>

          <Link href="/bus/login" passHref>
            <Button size="lg">Bus</Button>
          </Link>

          <Link href="/public" passHref>
            <Button size="lg" component="a">
              Public
            </Button>
          </Link>
        </VStack>
      </Flex>
    </Container>
  );
}
