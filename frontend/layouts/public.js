import Header from "../components/Header";
import { Box, Container, Flex } from "@chakra-ui/react";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <Container centerContent minH="100vh">
        <Flex height="100vh" alignItems="center">
          {children}
        </Flex>
      </Container>
    </>
  );
}
