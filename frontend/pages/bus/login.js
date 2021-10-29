import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "../../components/Link";

const schema = yup
  .object({
    phone: yup
      .number("Must be a number")
      .typeError("Must be a number")
      .min(1_000_000_000, "Please enter a valid phone number")
      .max(9_999_999_999, "Please enter a valid phone number")
      .required("Required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Required"),
  })
  .required();

export default function BusLoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <Container centerContent minH="100vh" bg="blue.400">
      <Flex height="100vh" alignItems="center">
        <VStack spacing={8}>
          <Heading>Bus Login</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.phone}>
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+91" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="1234567890"
                    {...register("phone")}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={!showPassword ? "password" : "text"}
                    placeholder="password"
                    {...register("password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button size="sm" onClick={toggleShowPassword}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Button isFullWidth mt={4} isLoading={isSubmitting} type="submit">
                Login Now
              </Button>
            </VStack>
          </form>

          <Link href="/bus/register">Don't have an account? Register Now</Link>
        </VStack>
      </Flex>
    </Container>
  );
}
