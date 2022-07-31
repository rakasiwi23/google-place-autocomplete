import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { AutoComplete } from "antd";

type PlacesProps = {
  setPlace: (position: google.maps.LatLngLiteral) => void;
};

export default function Places({ setPlace }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const onSelect = async (val: string, options: any) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = getLatLng(results[0]);

    setPlace({ lat, lng });
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <AutoComplete
      style={{ width: "100%" }}
      placeholder="Search places"
      disabled={!ready}
      value={value}
      options={
        status === "OK"
          ? data.map((d) => ({
              value: d.description,
              id: d.place_id,
            }))
          : []
      }
      onChange={onChange}
      onSelect={onSelect}
    />
  );
}
