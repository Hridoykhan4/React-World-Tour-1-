import { useState } from "react";
import { useEffect } from "react";
import Country from "../Country/Country";
import "./Countries.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [visitedCountries, setVisitedCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  });

  const handleVisitedCountries = (country) => {
    visitedCountries.push(country)
}

  return (
    <div>
      <h3>Countries: {countries.length}</h3>

      <div>
        <h4>Visited Countries: {visitedCountries.length}</h4>
        {/* <p>{visitedCountries}</p> */}
      </div>

      <div className="country-container">
        {countries.map((country) => (
          <Country key={country.cca2} handleVisitedCountries={handleVisitedCountries} country={country}></Country>
        ))}
      </div>
    </div>
  );
};

export default Countries;
