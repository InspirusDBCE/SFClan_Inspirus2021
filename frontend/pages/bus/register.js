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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Link from "../../components/Link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    reg: yup
      .string()
      .trim()
      .matches(
        /^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{4}$/,
        "Must match the given format, eg: GA01T1234"
      ),
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
                <Input
                  id="phone"
                  type="tel"
                  placeholder="1234567890"
                  {...register("phone")}
                />
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password")}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                  {...register("confirmPassword")}
                />
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.reg}>
                <FormLabel htmlFor="reg">Registration Number</FormLabel>
                <Input id="reg" placeholder="GA01T1234" {...register("reg")} />
                <FormErrorMessage>{errors.reg?.message}</FormErrorMessage>
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
