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

  /* Handle Visited Countries */
  const handleVisitedCountries = (country) => {
    const newVisitedCountries = [...visitedCountries, country];
    setVisitedCountries(newVisitedCountries)
}

  return (
    <div>
      <h3>Countries: {countries.length}</h3>
      {/* Visited Country */}
      <div>
        <h4>Visited Countries: {visitedCountries.length}</h4>
        <ul>
          {
            visitedCountries.map((country) => <li key={country.cca3}>{country.name.common}</li>)
          }
        </ul>
      </div>

    {/* Display Countries */}
      <div className="country-container">
        {countries.map((country) => (
          <Country key={country.cca2} handleVisitedCountries={handleVisitedCountries} country={country}></Country>
        ))}
      </div>
    </div>
  );
};

export default Countries;
