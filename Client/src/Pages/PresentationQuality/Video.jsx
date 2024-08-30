import React from 'react';
import InputPoids from './InputPoids';
import {useState} from 'react';
import Add from './Add';
import './pic.css';

export default function Video(){
const [vidQuality, setVidQuality] = useState({
    presenceVid: '',
    miniature: '',
});
const handleVidQualityChange = (event) => {
    const { name, value } = event.target;
    setVidQuality((prevVidQuality) => ({ ...prevVidQuality, [name]: value }));
  };
  return(
    <div className="picto">            
    
        <h2>Video Quality:</h2>
        <form>
          <label className="Star">
          <input type="checkbox"></input>
            Présence de vidéo:
            <select name="prenseVid" value={vidQuality.presenceVid} onChange={handleVidQualityChange}>
              <option value="">Select</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
            <label>Poids:</label>
            <input type="number" className="weight"></input>
          </label>
          <br />
          <label className="Star">
          <input type="checkbox"></input>
            Qualité de miniature:
            <div></div>
            <label>Poids:</label>
            <input type="number" className="weight"></input>
          </label>
          <br />
          <Add />
        </form>
            
    </div>
  )
}
