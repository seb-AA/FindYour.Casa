import countries from "world-countries";

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

  const getByLatLng = (latitude: number, longitude: number) => {
    return formattedCountries.find(
      (country) => country.latlng[0] === latitude && country.latlng[1] === longitude
    );
  };

  return {
    getAll,
    getByValue,
    getByLatLng,
  };
};

export default useCountries;
