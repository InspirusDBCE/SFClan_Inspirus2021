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
          <Heading>App Name</Heading>
          <Image src="/vercel.svg" width={72} height={24} />

          <Link href="/bus/login">
            <Button size="lg">Bus</Button>
          </Link>

          <Link href="/public">
            <Button size="lg" component="a">
              Public
            </Button>
          </Link>
        </VStack>
      </Flex>
    </Container>
  );
}
