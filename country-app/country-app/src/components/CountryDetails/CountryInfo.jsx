import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../Url/api";
import { Link } from "react-router-dom";

const CountryInfo = (
    ) => {
  const [country, setCountry] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();

  console.log(countryName); 

  useEffect(() => {
    const getCountryByName = async () => {
        console.log("inside get country by name");
      try {
        let res = await fetch(`${apiURL}/name/${countryName}`);
        console.log("After fetching data", res);
        if(res.status == 200){
            const data = await res.json();
            setCountry(data[0]);
            setIsLoading(false);
        }else if(res.status == 404){
            res = await fetch(`${apiURL}/alpha/${countryName}`);
            if (res.status == 200) {
                const data = await res.json();
                setCountry(data[0]);
                setIsLoading(false);
            }
        }

      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  },[countryName]);


  return (
    <div className="country__info__wrapper">
      <button>
        <Link to="/">&#8592; Back to Home</Link>
      </button>

      {isLoading && !error && <h4>........</h4>}
      {error && !isLoading && { error }}
        { country && 
                  <div className="country__info__container">
                  <div className="country__info-img">
                    <img src={country.flags.png} alt="" />
                  </div>
                  <div className="country__info">
                    <h3>{country.name.common}</h3>
        
                    <div className="country__info-left">
                    <div>
                        <h4>
                        Official-Name: <span>{country.name.official}</span>
                      </h4>
                      <h4>
                        population :{" "}
                        <span>
                          {country.population}
                        </span>
                      </h4>

                      <h4>
                        Region: <span>{country.region}</span>
                      </h4>
                      <h4>
                        Capital: <span>{country.capital}</span>
                      </h4>
                      </div>
                        <div>
                      <h4>
                        status:{" "}
                        <span>
                          {country.status}
                        </span>
                      </h4>
                      <h4>
                        Region: <span>{country.subregion}</span>
                      </h4>
                      <h4>
                        Timezone: <span>{country.timezones}</span>
                      </h4>
                      <h4>
                        Capital: <span>{country.capital}</span>
                      </h4>
                      </div>
                    </div>
                    <p className="border-country">
                        <h4 className="border-special">Border Countries: </h4>
                        <span className="country"> 
                        {country.borders && country.borders.map((border) => (    
                            <Link to={`/country/${border}`}>
                                <span className="">{border}</span>
                            </Link>
                        ))}
        
                        </span>
                    </p>
        
                  </div>
        
                </div>
        }
    </div>
  );
};

export default CountryInfo;




            {/* {borders.length ? (
                borders.map((border) => (
                    <div
                    key={border}
                    onClick={() => {
                        refetch();
                        navigate(`/${border}`)
                    }}
                    >
                        {border}
                    </div>
                ))
            ) : (
                <div>
                    <p>no borders...</p>
                </div>
            )} */}