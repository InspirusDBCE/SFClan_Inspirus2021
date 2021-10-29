import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function BusDashboardPage() {
  return (
    <Container minH="100vh" bg="blue.400">
      <Box p={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>Dashboard</Heading>

          <Link href="/bus/add">
            <Button variant="outline">Add Bus</Button>
          </Link>
        </Flex>

        <Box mt={8}>
          <VStack spacing={8}>
            <Link href="/bus/1">
              <Button>Bus 1</Button>
            </Link>

            <Link href="/bus/2">
              <Button>Bus 2</Button>
            </Link>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
}
