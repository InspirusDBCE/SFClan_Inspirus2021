import Header from "../components/Header";
import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
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
        <Container minH="100vh">
          <Box p={4}>{children}</Box>
        </Container>{" "}
      </motion.div>
    </>
  );
}
