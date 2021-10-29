import { Flex, Heading } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Flex justifyContent="center" alignItems="center" minH="100vh" minW="100vw">
      <Heading>Loading</Heading>
    </Flex>
  );
}
