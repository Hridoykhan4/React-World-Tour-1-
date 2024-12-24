import { useState } from 'react';
import './Country.css'
import CountryDetail from '../CountryDetail/CountryDetail';

const Country = ({country, handleVisitedCountries}) => {
    const {name, flags, population, area, cca3} = country;

    const [visited, setVisited] = useState(false)

    const handleVisited = () => {
        setVisited(!visited)
    }

  


    // console.log(country);
    return (
        <div className={`country ${visited && 'visited'}`}>
            <h3 style={{color: visited ? 'Purple' : 'white'}}>Name: {name?.common}</h3>
            <div style={{height: '208px'}}>
            <img  src={flags.png} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt='flag'/>
            </div>
            <p>Population: {population}</p>
            <p>Area: {area}</p>
            <p><small>Code: {cca3}</small></p>

            <br />

            <button onClick={() => {handleVisitedCountries(country)}}>Mark Visited</button>  
            <br />
            <br />

              
            <button style={{marginRight: '0.67rem'}} onClick={handleVisited}>{visited ? 'Visited' : 'Going'}</button>
            {
                visited ? <span>I have visited {name?.common}</span> : <span>Eager To go</span>
            }
           
           <hr />
           <CountryDetail 
           country={country}
            handleVisitedCountries={handleVisitedCountries}>
             
           </CountryDetail>
        </div>
    );
};

export default Country;