import React from 'react';
import InputPoids from './InputPoids';
import {useState} from 'react';
import Add from './Add';
import './pic.css';
export default function Picture(){
const [imgQuality, setImgQuality] = useState({
    realPhotoUsage: '',
    photoClarity: '',
    strategicPhotoChoice: ''
});
const handleImgQualityChange = (event) => {
    const { name, value } = event.target;
    setImgQuality((prevImgQuality) => ({ ...prevImgQuality, [name]: value }));
    console.log(imgQuality);
  };
  return(
    
    <div className="picto">
        <h2>Picture Quality:</h2>
        <form className="lama">
          <div className="Star">
            <input type="checkbox"></input>
            Degré d'utilisation des photos réelles:
            <select name="realPhotoUsage" value={imgQuality.realPhotoUsage} onChange={handleImgQualityChange}>
              <option value="">Select</option>
              <option value="faible">Faible</option>
              <option value="moyen">Moyen</option>
              <option value="fort">Fort</option>
            </select>
            <label className="label">Poids:</label>
            <input type="number" className="weight"></input>
          </div>
          <br />
          <div className="Star">
          <input type="checkbox"></input>
            Clarté de la photo:
            <div></div>
            <label className="label">Poids:</label>
            <input type="number" className="weight"></input>
          </div>
          <br />
          <div className="Star">
          <input type="checkbox"></input>
            Choix stratégique des photos:
            <select name="strategicPhotoChoice" value={imgQuality.strategicPhotoChoice} onChange={handleImgQualityChange}>
              <option value="">Select</option>
              <option value="faible">Faible</option>
              <option value="moyen">Moyen</option>
              <option value="fort">Fort</option>
            </select>
            <label className="label">Poids:</label>
            <input type="number" className="weight"></input>
          
          </div>
          <Add />
          <br />
        </form>
            
    </div>
  )
}
