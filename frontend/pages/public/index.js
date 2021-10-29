import {
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import Bus from "../../apis/bus";
import useUserLocation from "../../hooks/useUserLocation";
import PublicLayout from "../../layouts/public";

export default function PublicIndexPage() {
  const {
    loaded: userLocationLoaded,
    data: userLocation,
    error,
  } = useUserLocation();
  const toast = useToast();

  const [search, setSearch] = useState("");

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 400);

  useEffect(() => {
    async function load() {
      if (!userLocationLoaded || !search) return;

      const userLocation = {
        lat: 15.291974,
        lng: 73.9690846,
      };

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

      service.findPlaceFromQuery(request, async function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // for (var i = 0; i < results.length; i++) {
          //   console.log(results[i]);
          // }

          const position = results[0].geometry.location;

          // map.setCenter(position);

          const trafficLayer = new google.maps.TrafficLayer();

          trafficLayer.setMap(map);

          console.log(position, userLocation);

          const destinationMarker = new google.maps.Marker({
            position,
            map,
            title: results[0].name,
          });

          destinationMarker.addListener("click", () => {
            toast({
              title: results[0].name,
              description: "This is your destination",
              status: "info",
            });
          });

          const userMarker = new google.maps.Marker({
            position: userLocation,
            map,
            title: "You",
            icon: "/icons/user.png",
          });

          userMarker.addListener("click", () => {
            toast({
              title: "You",
              description: "This is your location",
              status: "info",
            });
          });

          const destination = {
            lat: position.lat(),
            lng: position.lng(),
            place_id: results[0].place_id,
            name: results[0].name,
          };

          try {
            const { data } = await Bus.nearby({ destination, userLocation });

            data.forEach((bus) => {
              const busMarker = new google.maps.Marker({
                position: {
                  lat: bus.curr_lat,
                  lng: bus.curr_long,
                },
                map,
                title: bus.reg,
                icon: "/icons/bus.png",
              });

              busMarker.addListener("click", () => {
                toast({
                  title: bus.reg,
                  description: bus.sc_name
                    .map((name, index) => `${name} - ${bus.sc_time[index]}`)
                    .join(" | "),
                  status: "info",
                });
              });
            });
          } catch (err) {
            console.error(err);

            if (err?.response?.status >= 500)
              toast({
                title: "Something went wrong",
                description: "Please Try again",
                status: "warning",
              });
            else
              toast({
                title: "Failed to get buses",
                description: "Please Try again",
                status: "warning",
              });
          }
        }
      });
    }

    load();
  }, [search, userLocation, userLocationLoaded]);

  return (
    <PublicLayout>
      <VStack spacing={8}>
        <Box id="map" mt={2} minHeight={400} minWidth="80vw" />

        <FormControl>
          <FormLabel htmlFor="location">Where do you wish to go ?</FormLabel>

          <Input
            id="location"
            placeholder="Panaji Bus Stand"
            onChange={handleSearch}
          />
        </FormControl>
      </VStack>
    </PublicLayout>
  );
}
