import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  VStack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Link from "../../components/Link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup
  .object({
    phone: yup
      .number("Must be a number")
      .typeError("Must be a number")
      .min(1_000_000_000, "Please enter a valid phone number")
      .max(9_999_999_999, "Please enter a valid phone number")
      .required("Required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  })
  .required();

export default function BusRegisterPage() {
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
          <Heading>Bus Register</Heading>

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

              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  type={!showPassword ? "password" : "text"}
                  placeholder="confirm password"
                  {...register("confirmPassword")}
                />
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>

              <Button isFullWidth mt={4} isLoading={isSubmitting} type="submit">
                Register Now
              </Button>
            </VStack>
          </form>

          <Link href="/bus/login">Already have an account? Login Now</Link>
        </VStack>
      </Flex>
    </Container>
  );
}
