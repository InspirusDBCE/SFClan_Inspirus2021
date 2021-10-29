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
import withAuth from "../../components/withAuth";

function BusDashboardPage() {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading>Dashboard</Heading>

        <Link href="/bus/add">
          <Button variant="outline">Add Bus</Button>
        </Link>
      </Flex>

      <Box mt={8}>
        <VStack spacing={8} alignItems="stretch">
          <Link href="/bus/1">
            <Button>GA01T1234</Button>
          </Link>

          <Link href="/bus/2">
            <Button>GA02T1234</Button>
          </Link>
        </VStack>
      </Box>
    </>
  );
}

export default withAuth(BusDashboardPage);
