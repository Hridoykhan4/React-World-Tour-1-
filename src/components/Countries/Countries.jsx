import { useState } from "react";
import { useEffect } from "react";
import Country from "../Country/Country";
import "./Countries.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [deletedList, setDeletedList] = useState([]);

  console.log(deletedList);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  /* Handle Visited Countries */
  const handleVisitedCountries = (country) => {
    const newVisitedCountries = [...visitedCountries, country];
    setVisitedCountries(newVisitedCountries);
  };

  const handleRemove = (desh) => {
    const remaining = visitedCountries.filter(
      (country) => country.cca3 !== desh.cca3
    );
    setVisitedCountries(remaining);
    const selectOne = visitedCountries.find(
      (country) => country.cca3 === desh.cca3
    );
    console.log(selectOne);
    setDeletedList([...deletedList, selectOne]);
  };

  return (
    <div>
      <h3>Countries: {countries.length}</h3>
      {/* Visited Country */}
      <div>
        <h4>Visited Countries: {visitedCountries.length}</h4>
        <ul>
          {visitedCountries.map((country) => (
            <div key={country.cca3} style={{ margin: "1rem" }}>
              <li>{country.name.common}</li>
              <button onClick={() => handleRemove(country)}>Delete</button>
            </div>
          ))}
        </ul>

        <div>
          <h2>Deleted List: {deletedList.length}</h2>
          {deletedList.map((country) => (
            <div key={country.cca3}>
              <p>{country.name.common}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Countries */}
      <div className="country-container">
        {countries.map((country) => (
          <Country
            key={country.cca2}
            handleVisitedCountries={handleVisitedCountries}
            country={country}
          ></Country>
        ))}
      </div>
    </div>
  );
};

export default Countries;
