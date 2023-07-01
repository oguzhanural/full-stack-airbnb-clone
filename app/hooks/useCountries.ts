import countries from "world-countries"

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng, // latitude, longitude, (enlem, boylam)
    region: country.region
}));

const useCountries = () => {
    const getAll = () => formattedCountries;
    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value); // format countries 'ın içinde ki her bir obje item değişkenine atanır.
    }

    return {
        getAll,
        getByValue
    }
};

export default useCountries;
 
