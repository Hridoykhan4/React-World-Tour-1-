import CountryData from "../CountryData/CountryData";

const CountryDetail = (props) => {
    // const {country, handleVisitedCountries} = props
    return (
        <div>
                <h3>Country Details: </h3> 
                <hr />
                <CountryData 
                {...props}
                ></CountryData>                 
        </div>
    );
};

export default CountryDetail;