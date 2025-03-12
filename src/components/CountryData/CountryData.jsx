const CountryData = ({ country }) => {
  return (
    <div className="my-3">
      <p>
        <small>Country Data: {country.name.common}</small>
      </p>
    </div>
  );
};

export default CountryData;
