import { GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import Places from "./places";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

export default function Map() {
  const [place, setPlace] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
    }),
    [],
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  return (
    <div className="container">
      <div className="controls">
        <h1>Place?</h1>
        <Places
          setPlace={(position) => {
            setPlace(position);
            mapRef.current?.panTo(position);
          }}
        />
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {place && <Marker position={place} />}
        </GoogleMap>
      </div>
    </div>
  );
}
