import countries from "world-countries";
import axios from "axios";

const formattedCountries = countries.map((country: any) => ({
  label: country.name.common,
  value: country.cca2,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    const country = formattedCountries.find(
      (country) => country.value === value
    );
    return country;
  };

  const getByLatLng = async (latitude: number, longitude: number) => {
    const apiKey = "process.env.NEXT_PUBLIC_OPENCAGE_API_KEY";
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);

    const { city, state, country } = response.data.results[0].components;

    return {
      city,
      region: state,
      country,
    };
  };

  return {
    getAll,
    getByValue,
    getByLatLng,
  };
};

export default useCountries;
