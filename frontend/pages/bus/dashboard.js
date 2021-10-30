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
import { motion } from "framer-motion";
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
  }, [toast]);

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
          <Text textAlign="center">Your Buses</Text>

          {buses?.map((item, index) => (
            <motion.div
              initial={{
                translateY: 30,
                opacity: 0,
              }}
              animate={{
                translateY: 0,
                opacity: 1,
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.4,
                delay: index / 10,
              }}
              key={item.bid}
            >
              <Button isFullWidth onClick={() => handleBusClick(item)}>
                {item.reg}
              </Button>
            </motion.div>
          ))}
        </VStack>
      </Box>
    </>
  );
}

export default withAuth(BusDashboardPage);
