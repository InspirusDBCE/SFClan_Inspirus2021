import Header from "../components/Header";
import { Box, Container, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          ease: "easeInOut",
          duration: 0.7,
        }}
      >
        <Container centerContent minH="100vh">
          <Flex height="100vh" alignItems="center">
            {children}
          </Flex>
        </Container>{" "}
      </motion.div>
    </>
  );
}
