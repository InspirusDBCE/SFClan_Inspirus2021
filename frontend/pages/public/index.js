import { Box, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import useUserLocation from "../../hooks/useUserLocation";
import PublicLayout from "../../layouts/public";
import debounce from "lodash.debounce";

export default function PublicIndexPage() {
  const {
    loaded: userLocationLoaded,
    data: userLocation,
    error,
  } = useUserLocation();

  const [search, setSearch] = useState("");

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

        const temp = {
          lat: position.lat(),
          lng: position.lng(),
          place_id: results[0].place_id,
          name: results[0].name,
        };
      }
    });
  }, [search, userLocation, userLocationLoaded]);

  return (
    <PublicLayout>
      <VStack spacing={8}>
        <FormControl>
          <FormLabel htmlFor="location">Where do you wish to go ?</FormLabel>

          <Input
            id="location"
            placeholder="Panaji Bus Stand"
            onChange={handleSearch}
          />
        </FormControl>

        <Box id="map" mt={2} minHeight={200} width="100%" />
      </VStack>
    </PublicLayout>
  );
}
