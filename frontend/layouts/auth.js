import Header from "../components/Header";
import { Box, Container } from "@chakra-ui/react";

export default function AuthLayout({ children }) {
  return (
    <>
      <Header />
      <Container minH="100vh">
        <Box p={4}>{children}</Box>
      </Container>
    </>
  );
}
