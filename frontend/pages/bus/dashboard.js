import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Bus from "../../apis/bus";
import withAuth from "../../components/withAuth";

function BusDashboardPage() {
  const [buses, setBuses] = useState([]);
  const toast = useToast();
  useEffect(() => {
    async function load() {
      try {
        const { data } = await Bus.fetch();
        setBuses(data);
        console.log("y buses", data);
      } catch (err) {
        console.error(err);
        toast({
          title: err?.message,
          description: "Please try again",
          status: "warning",
        });
      }
    }

    load();
  }, []);

  const handleBusClick = (bus) => {
    toast({
      title: bus.reg,
      description: bus.sc_name
        .map((name, index) => `${name} - ${bus.sc_time[index]}`)
        .join(" | "),
      status: "info",
    });
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading>Dashboard</Heading>

        <Link href="/bus/add" passHref>
          <Button variant="outline">Add Bus</Button>
        </Link>
      </Flex>

      <Box mt={8}>
        <VStack spacing={4} alignItems="stretch">
          <Text>Your Buses</Text>

          {buses.map((item) => (
            <Button key={item.bid} onClick={() => handleBusClick(item)}>
              {item.reg}
            </Button>
          ))}
        </VStack>
      </Box>
    </>
  );
}

export default withAuth(BusDashboardPage);
