

export default function InputPoid({Name,MyFunction, defultpoid}){
    const [poid, setPoid] = useState(defaultPoid); // Maintain internal poid state

    const handleChange = (event) => {
        const newPoid = parseInt(event.target.value, 0); // Parse string to integer
        setPoid(newPoid); // Update internal poid state
        MyFunction(newPoid); // Call the provided onPoidChange function with the new value
    };
    return(
       
        <div>
          
                <input type="checkbox" />
                <span>{Name}</span>
                
                <input type="number" value={defultpoid} onChange={handleChange}/>
           
        </div>
    )
}