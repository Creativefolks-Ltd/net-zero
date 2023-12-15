import React from "react";


const CountryOptions = ({ countries }) => {

    return (
        <>
            {countries?.map((item, index) => (
                <option value={item.name} key={item.name}>{item.name}</option>
            ))}
        </>
    )
}

export default CountryOptions;
