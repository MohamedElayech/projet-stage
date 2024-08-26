import React from 'react';
import { useState } from "react";
export default function InputPoids({ Name="Poids", MyFunction, defaultPoids }) {
    // State variable to store the poids value
    const [poids, setPoids] = useState(defaultPoids);
  
    const handleChange = (event) => {
      const newPoids = parseInt(event.target.value, 10);
      setPoids(newPoids);
      MyFunction(newPoids);
    };
  
    return(
       
        <>
            {/* Display the name */}
            <span>{Name}</span>
            {/* Number input with handleChange handler */}
            <input type="number" value={poids} onChange={handleChange} style={{width:50}}/>
        </>
    )
}