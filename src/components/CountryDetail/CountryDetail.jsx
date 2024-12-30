import CountryData from "../CountryData/CountryData";

const CountryDetail = (props) => {
  const { country } = props;
  // console.log(country);
  return (
    <div>
      <h3>Country Region: {country.region}</h3>
      <hr />
      <CountryData {...props}></CountryData>
    </div>
  );
};

export default CountryDetail;
