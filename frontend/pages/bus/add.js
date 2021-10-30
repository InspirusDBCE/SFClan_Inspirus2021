import { DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import debounce from "lodash.debounce";
import moment from "moment";
import { useEffect, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useUserLocation from "../../hooks/useUserLocation";
import { formatTime } from "../../utils";
import withAuth from "../../components/withAuth";

const schema = yup
  .object({
    reg: yup
      .string()
      .trim()
      .matches(
        /^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{4}$/,
        "Must match the given format, eg: GA01T1234"
      ),
  })
  .required();

let temp = null;

function BusAddPage() {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reg: "",
    },
  });

  const {
    loaded: userLocationLoaded,
    data: userLocation,
    error,
  } = useUserLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [time, setTime] = useState(moment());
  const [schedule, setSchedule] = useState([
    {
      lat: 15.2878,
      lng: 73.9562,
      place_id: "ChIJKTkEel-xvzsRXP6Q54CUkoo",
      name: "Margao Bus Terminal",
      time: "6:43",
    },
  ]);

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify({ ...values, schedule }, null, 2));
        resolve();
      }, 3000);
    });
  }

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 400);

  useEffect(() => {
    if (!userLocationLoaded || !search) return;

    const center = new google.maps.LatLng(userLocation.lat, userLocation.lng);

    const map = new google.maps.Map(document.getElementById("map"), {
      center,
      zoom: 15,
    });

    const request = {
      query: search,
      fields: ["name", "geometry.location", "place_id"],
    };

    const service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
        }

        const position = results[0].geometry.location;
        map.setCenter(position);
        new google.maps.Marker({
          position,
          map,
          title: results[0].name,
        });

        temp = {
          lat: position.lat(),
          lng: position.lng(),
          place_id: results[0].place_id,
          name: results[0].name,
        };
      }
    });
  }, [search, userLocation, userLocationLoaded]);

  const handleAddLocation = () => {
    if (temp === null) return;

    const foundLocation = schedule.find(
      (item) => item.place_id === temp.place_id
    );

    temp.time = formatTime(time);

    if (!foundLocation) setSchedule((prevState) => [...prevState, { ...temp }]);

    temp = null;

    onClose();
  };

  const handleTimeChange = (mTime) => {
    setTime(mTime);
  };

  const handleRemoveLocation = (placeId) => {
    setSchedule(schedule.filter((item) => item.place_id !== placeId));
  };

  const scheduleBG = useColorModeValue("blue.400", "blue.200");
  const scheduleTextColor = useColorModeValue("white", "gray.900");

  return (
    <>
      <Heading>Add Bus</Heading>

      <Box mt={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} textAlign="left">
            <FormControl isInvalid={errors.reg}>
              <FormLabel htmlFor="reg">Registration Number</FormLabel>
              <Input id="reg" placeholder="GA01T1234" {...register("reg")} />
              <FormErrorMessage>{errors.reg?.message}</FormErrorMessage>
            </FormControl>

            <Divider />

            <Box width="100%" pb={8}>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="md" colorScheme="gray">
                  Schedule
                </Heading>

                <Button onClick={onOpen} size="sm">
                  Add Location
                </Button>
              </Flex>

              <VStack>
                {schedule.map((item) => (
                  <Flex
                    key={item.place_id}
                    bg={scheduleBG}
                    borderRadius="md"
                    mt={4}
                    p={2}
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text
                      fontWeight="semibold"
                      textColor={scheduleTextColor}
                    >{`${item.name} - ${item.time}`}</Text>

                    <IconButton
                      aria-label="delete location from schedule"
                      icon={<DeleteIcon color={"orange.400"} />}
                      size="sm"
                      onClick={() => handleRemoveLocation(item.place_id)}
                    />
                  </Flex>
                ))}
              </VStack>
            </Box>

            <Button
              isFullWidth
              isLoading={isSubmitting}
              disabled={schedule.length === 0}
              type="submit"
              color={useColorModeValue("blue.600", "blue.400")}
            >
              Add Bus Now
            </Button>
          </VStack>
        </form>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Location to add" onChange={handleSearch} />

            <Box color={useColorModeValue("gray.900", "white")} mt={2}>
              <Datetime
                initialViewMode="time"
                dateFormat={false}
                input={false}
                value={time}
                onChange={handleTimeChange}
              />
            </Box>

            <Box id="map" minHeight={200} mt={4} width="100%" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddLocation}>
              Add Location Now
            </Button>

            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default withAuth(BusAddPage);
