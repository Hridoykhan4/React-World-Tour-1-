import { useState } from "react";
import { useEffect } from "react";
import Country from "../Country/Country";
import "./Countries.css";
import toast from "react-hot-toast";
import {
  addToLS,
  getStoredCountries,
  removeFromLS,
} from "../utils/localStorage";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [deletedList, setDeletedList] = useState([]);
  const [tempCountries, setTempCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setTempCountries(data);
      });
  }, []);

  /* Handle Visited Countries */
  const handleVisitedCountries = (country) => {
    const isExist = visitedCountries.find((land) => land.cca3 === country.cca3);
    if (isExist) {
      toast.error("Can not Select twice", {
        duration: 2000,
        position: "top-left",
        style: { height: "3rem", fontWeight: "bolder" },
      });
    } else {
      setVisitedCountries([...visitedCountries, country]);
      addToLS(country.cca3);
      toast.success("Selected Country", {
        position: "top-right",
        style: { padding: "0.6rem" },
      });
    }
  };

  // Loaded local storage items
  useEffect(() => {
    if (countries.length) {
      const cart = getStoredCountries();
      const savedCountry = [];
      for (const c of cart) {
        const country = countries.find((country) => country.cca3 === c);
        savedCountry.push(country);
      }
      setVisitedCountries(savedCountry);
    }
  }, [countries]);

  const handleRemove = (desh) => {
    const remaining = visitedCountries.filter(
      (country) => country.cca3 !== desh.cca3
    );
    setVisitedCountries(remaining);
    removeFromLS(desh.cca3);
    toast.success("Deleted Successfully");
    const selectOne = visitedCountries.filter(
      (country) => country.cca3 === desh.cca3
    );
    setDeletedList([...deletedList, ...selectOne]);
  };

  const handleKey = (e) => {
    const targetValue = e.target.value;
    if (targetValue) {
      let filtered = [];
      for (const e of tempCountries) {
        if (e.name.common.toLowerCase().includes(targetValue.toLowerCase())) {
          filtered.push(e);
        }
      }
      if (filtered) {
        setCountries(filtered);
      }
    } else {
      setCountries(tempCountries);
    }
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
            <ul key={country.cca3}>
              <li>{country.name.common}</li>
            </ul>
          ))}
        </div>
      </div>

      <input
        type="text"
        onKeyUp={(e) => handleKey(e)}
        placeholder="Search Country"
        style={{ padding: "1.3rem 1rem" }}
      />

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
