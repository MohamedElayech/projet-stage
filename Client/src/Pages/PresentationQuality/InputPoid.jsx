import { useState } from "react";

export default function InputPoid({ Name, MyFunction, defaultPoid }) {
    // State variable to store the poid value
    const [poid, setPoid] = useState(defaultPoid);
  
    const handleChange = (event) => {
      const newPoid = parseInt(event.target.value, 10);
      setPoid(newPoid);
      MyFunction(newPoid);
    };
  
    return(
       
        <div>
            {/* Display the name */}
            <span>{Name}</span>
            {/* Number input with handleChange handler */}
            <input type="number" value={0} onChange={handleChange} />
        </div>
    )
}