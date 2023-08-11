import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const headers = {
    "X-RapidAPI-Key": "f1bbd8df9cmsh04aca1f86532b5dp14e49bjsn12ef810e31a8",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const { manufacturer, year, limit, fuel, model } = filters;
  // console.log(fuel);
  // console.log(year);

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&&year=${year}&&model=${model}&&limit=${limit}&&fuel_type=${fuel}`,
    { headers: headers }
  );
  console.log(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&&year=${year}&&model=${model}&&limit=${limit}&&fuel_type=${fuel}`
  );

  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; //Base rental price per day in dollars

  const mileageFactor = 0.1; //additional rate per mile driven

  const ageFactor = 0.05; //additional rate per year of vehicle age

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  //   calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0); //Number of digits after the decimal point.
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, year, model } = car;
  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);
  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("type", value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};
