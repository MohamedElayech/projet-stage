import React from 'react';
// import InputPoids from './InputPoids';
import {useState} from 'react';
import Add from './Add';
import './pic.css';
export default function Picture(){
const [imgQuality, setImgQuality] = useState({
    realPhotoUsage: '',
    photoClarity: '',
    strategicPhotoChoice:''
});
const [poidsImg, setPoidsImg]=useState({
  poidsrealPhotoUsage: 0,
  poidsphotoClarity: 0,
  poidsstrategicPhotoChoice: 0
});
const [imagepoid,setImagepoid]=useState('')
const handleImgQualityChange = (event) => {
    const { name, value } = event.target;
    setImgQuality((prevImgQuality) => ({ ...prevImgQuality, [name]: value }));
    
    
    
  };
  // console.log(imgQuality);
  const handlePoidsImgChange = (event) => {
    const name = event.target.name;
    if(event.target.parentNode.querySelector('input[type="checkbox"]').checked){
      setPoidsImg((prevPoidsImg) => ({ ...prevPoidsImg, [name]: event.target.value }))
    };
    
  };
  const handlepoidsubmit = (event) => {
      setImagepoid(event.target.value)

  }
  const handlesubmit = async (event) => {
    event.preventDefault();
    let imagecri=''
    
    if(parseFloat(poidsImg.poidsphotoClarity) > parseFloat(poidsImg.poidsrealPhotoUsage) && parseFloat(poidsImg.poidsphotoClarity)>parseFloat(poidsImg.poidsstrategicPhotoChoice)){
      imagecri='imageClarity'
    }else{
      if(parseFloat(poidsImg.poidsrealPhotoUsage) > parseFloat(poidsImg.poidsstrategicPhotoChoice)){
        imagecri=imgQuality.realPhotoUsage
      }else{
        imagecri=imgQuality.strategicPhotoChoice
      }
    }
    let data={
      'imagecri':imagecri,
      'poidImage':imagepoid
    }
    const response = await fetch('http://localhost:8080/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });


  }
  // console.log(parseFloat(poidsImg.poidsrealPhotoUsage));
  // console.log(parseFloat(poidsImg.poidsphotoClarity))
  return(
    
    <div className="picto">
        <h2>Picture Quality:</h2>
        <form className="lama">
          <div className="Star">
          <input type="checkbox" className="reee" defaultChecked></input>
            Degré d'utilisation des photos réelles:
            <select name="realPhotoUsage" value={imgQuality.realPhotoUsage} onChange={handleImgQualityChange}>
              <option value="">Select</option>
              <option value="faible">Faible</option>
              <option value="moyen">Moyen</option>
              <option value="fort">Fort</option>
            </select>
            <label className="label">Poids:</label>
            <input type="number" name="poidsrealPhotoUsage" value={poidsImg.poidsrealPhotoUsage} className="weight"  onChange={handlePoidsImgChange}></input>
          </div>
          <br />
          <div className="Star">
          <input type="checkbox" defaultChecked></input>
            Clarté de la photo:
            <div></div>
            <label className="label">Poids:</label>
            <input type="number" name="poidsphotoClarity" value={poidsImg.poidsphotoClarity} className="weight" onChange={handlePoidsImgChange}></input>
          </div>
          <br />
          <div className="Star">
          <input type="checkbox" defaultChecked></input>
            Choix stratégique des photos:
            <select name="strategicPhotoChoice" value={imgQuality.strategicPhotoChoice} onChange={handleImgQualityChange}>
              <option value="">Select</option>
              <option value="faible">Faible</option>
              <option value="moyen">Moyen</option>
              <option value="fort">Fort</option>
            </select>
            <label className="label">Poids:</label>
            <input type="number" className="weight" name="strategicPhotoChoice" value={poidsImg.poidsstrategicPhotoChoice} onChange={handlePoidsImgChange}></input>
          
          </div>
          <Add />
          <br />
          <div className='imgsub'>
            <div>
              <label htmlFor="">Ajouter le poids de l'image</label>
              <input type="text" placeholder="poids" onChange={handlepoidsubmit}/>
            </div>
            
            <button  onClick={handlesubmit}>Soumettre</button>
          </div>
        </form>
            
    </div>
  )
}
