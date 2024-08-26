import React from 'react';
import InputPoids from './InputPoids';
import {useState} from 'react';
import Add from './Add';

export default function Picture(){
const [imgQuality, setImgQuality] = useState({
    realPhotoUsage: '',
    photoClarity: '',
    strategicPhotoChoice: ''
});
const handleImgQualityChange = (event) => {
    const { name, value } = event.target;
    setImgQuality((prevImgQuality) => ({ ...prevImgQuality, [name]: value }));
  };
  return(
    <div>
        <h2>Photo Quality:</h2>
        <form>
          <label>
            Degré d'utilisation des photos réelles:
            <select name="realPhotoUsage" value={imgQuality.realPhotoUsage} onChange={handleImgQualityChange}>
              <option value="">Select</option>
              <option value="faible">Faible</option>
              <option value="moyen">Moyen</option>
              <option value="fort">Fort</option>
            </select>
            <label>Poids:</label>
            <input type="text" style={{width:50}}></input>
          </label>
          <br />
          <label>
            Clarté de la photo:
            <select name="photoClarity" value={imgQuality.photoClarity} onChange={handleImgQualityChange}>
              <option value="">Select</option>
              <option value="bruité">Bruité</option>
              <option value="floue">Floue</option>
            </select>
            <InputPoids  defaultPoids={10} />
          </label>
          <br />
          <label>
            Choix stratégique des photos:
            <select name="realPhotoUsage" value={imgQuality.realPhotoUsage} onChange={handleImgQualityChange}>
              <option value="">Select</option>
              <option value="faible">Faible</option>
              <option value="moyen">Moyen</option>
              <option value="fort">Fort</option>
            </select>
            <InputPoids  defaultPoids={10} />
          <Add />
          </label>
          <br />
        </form>
            
    </div>
  )
}
