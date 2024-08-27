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
        
        <form className="lama">
          <div className="Star">
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
            Clarté de la photo:
            <select name="photoClarity" value={imgQuality.photoClarity} onChange={handleImgQualityChange}>
              <option value="">Select</option>
              <option value="bruité">Bruité</option>
              <option value="floue">Floue</option>
            </select>
            <label className="label">Poids:</label>
            <input type="number" className="weight"></input>
          </div>
          <br />
          <div className="Star">
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
