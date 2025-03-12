import CountryData from "../CountryData/CountryData";

const CountryDetail = (props) => {
  const { country } = props;
  // console.log(country);
  return (
    <div className="">
      <h3 className="mt-3">Country Region: {country.region}</h3>
      <hr className="space-y-3 mt-4" />
      <CountryData {...props}></CountryData>
    </div>
  );
};

export default CountryDetail;
