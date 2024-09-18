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
const [poidsVidQuality,setPoidsVidQuality]= useState({
  poidPresenceVid: 0,
  poidsMiniature: 0,
});
const handleVidQualityChange = (event) => {
    const { name, value } = event.target;
    setVidQuality((prevVidQuality) => ({ ...prevVidQuality, [name]: value }));
  };
const handlePoidsVidQuality = (event) => {
  const { name, value } = event.target;
  setPoidsVidQuality((prevPoidsVidQuality) => ({ ...prevPoidsVidQuality, [name]: value }));
};
  return(
    <div className="picto">            
    
        <h2>Video Quality:</h2>
        <form>
          <label className="Star">
          <input type="checkbox"></input>
            Présence de vidéo:
            <select name="presenceVid" value={vidQuality.presenceVid} onChange={handleVidQualityChange}>
              <option value="">Select</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
            <label>Poids:</label>
            <input type="number" className="weight" name="poidsPresenceVid" value={poidsVidQuality.poidPresenceVid} onChange={handlePoidsVidQuality}></input>
          </label>
          <br />
          <label className="Star">
          <input type="checkbox"></input>
            Qualité de miniature:
            <div></div>
            <label>Poids:</label>
            <input type="number" className="weight" name="poidsMiniature" value={poidsVidQuality.poidsMiniature } onChange={handlePoidsVidQuality}></input>
          </label>
          <br />
          <Add />
        </form>
            
    </div>
  )
}
