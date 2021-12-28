export default function Info({country}){
    return(
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <h3>languages</h3>
            <ul>
                {
                Object.keys(country.languages).map(function(key, index) {
                    return <li key={country.languages[key]}>{country.languages[key]}</li>
                })
                }
            </ul>
            <div style={{fontSize:'180px'}}>
                {country.flag}
            </div>
        </div>
    );
}