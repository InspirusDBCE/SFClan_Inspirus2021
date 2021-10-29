import { useEffect, useState } from "react";

export default function useUserLocation() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (!"geolocation" in navigator) {
      setError("Geolocation not available");
      return;
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          setData({ lat, lng });
          setLoaded(true);
        }
      );
    }
  }, []);

  return { loaded, error, data };
}
