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
  const [spinner, setSpinner] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  useEffect(() => {
    setSpinner(true);

    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          seeMore ? setCountries(data) : setCountries(data.slice(0, 10));
          setTempCountries(data);
          {
            setSpinner(false) && setSeeMore(false);
          }
        }, 2000);
      });
  }, [seeMore]);

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

  const handleCapital = (e) => {
    const capital = e.target.value;

    const loadData = async () => {
      const res = await fetch(
        `https://restcountries.com/v3.1/capital/${capital}`
      );
      const data = await res.json();
      data.length ? setCountries(data) : setCountries(tempCountries);
    };

    loadData();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl text-green-400">Countries: {countries.length}</h3>
      {/* Visited Country */}
      <div className="space-y-3">
        <h4>Visited Countries: {visitedCountries.length}</h4>
        <ul className="list-decimal list-inside">
          {visitedCountries.map((country) => (
            <>
              <li className="inline mr-4">{country?.name?.common}</li>
              <span className="btn" onClick={() => handleRemove(country)}>
                Delete
              </span>
            </>
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
        className="input input-bordered"
        onKeyUp={(e) => handleKey(e)}
        placeholder="Search Country By Name"
        style={{ padding: "1.3rem 1rem" }}
      />

      <br />

      <input
        type="text"
        className="input input-bordered"
        onKeyUp={(e) => handleCapital(e)}
        placeholder="Search Country By Capital"
        style={{ padding: "1.3rem 1rem" }}
      />

      {spinner && (
        <div className="relative flex justify-center items-center">
          <div className="absolute animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
          <img src="" className="rounded-full" />
        </div>
      )}

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

      {spinner || seeMore ? null : (
        <div className="text-center">
          <button
            onClick={() => setSeeMore(true)}
            className="btn btn-primary text-white"
          >
            See All
          </button>
        </div>
      )}
    </div>
  );
};

export default Countries;
