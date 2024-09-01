import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function TweetEvaluationForm ()  {
  
  const [usefulnessScore, setUsefulnessScore] = useState({
    engagement_score : 0,
    profil_score: 0,
    polarity_score: 0
  });

  const [poids, setPoids] = useState({
    poidsDuProfil:0,
    nbAbonnesPoids: 0,
    typeEmetteurPoids: 0,
    professionPoids: 0,
 
    tweetPolarityPoids: 0,

    tweetEngagement:0,
    likesPoids: 0,
    repliesPoids: 0,
    retweetsPoids: 0,
    viewsPoids: 0,
   
  });

 

  const [parametres, setParametres] = useState({
    
    nbAbonnesSeuil: 500,

    likesSeuil: 500,
    repliesSeuil: 500,
    retweetsSeuil: 500,
    viewsSeuil: 1000,
    
  });

  const [criteresSelectionnes, setCriteresSelectionnes] = useState({

    poidsDuProfil:false,
    abonnes: false,
    typeEmetteurSelectionne: false,
    professionSelectionne: false,

    tweetPolarity: false,

    tweetEngagement:false,
    likes: false,
    replies: false,
    retweets: false,
    views: false
    
 });
  const [partieVisible,setPartieVisible]= useState(false)
  const [criteresAjoutes, setCriteresAjoutes]=useState([{critereName:'',critereValue:0,critereEtat:'indéfini'}]);
  const addNewCritere = ()=>{
     setCriteresAjoutes([...criteresAjoutes,{critereName:'',critereValue:0,critereEtat:'indéfini'}])
     
  }
  const handleNEWcriterechange = (i,e)=>{
    const {name,value} = e.target;
    const newcriteres= [...criteresAjoutes];
    newcriteres[i][name]=value;
    setCriteresAjoutes(newcriteres)

  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    console.log('checked');

    
      setCriteresSelectionnes(prevCriteria => ({
        ...prevCriteria,
        [name]: checked
      }));
   
  };

const handleInputChange = (e) => {
  const { name, value } = e.target;//targeted attributes

  if (name in poids) {
    // Update poids
    setPoids(prevPoids => ({
      ...prevPoids,
      [name]: value
    }));
  }
};
const handleParametresInput=(e) =>{
  const { name, value } = e.target;//targeted attributes
  setParametres(prevParams => ({
    ...prevParams,
    [name]: value}))

};
const navigate = useNavigate();
const [loadingPart, setloadingPart]=useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
        //tweetData,
        criteresSelectionnes,
        poids,
        parametres,
        criteresAjoutes,
      };

    try {
        setloadingPart(true);
        console.log('we are here')
        // Use await here to wait for the response before continuing
        const response = await axios.post('/api/evaluate_tweet', data);
        const databack=response.data;
        

        console.log(databack);
       
        navigate('/ResultPage', { state: {  result: databack  } });

        //setUsefulnessScore({
          //engagement_score : databack.engagement_score,
          //profil_score: databack.profil_score,
          //polarity_score: databack.polarity_score
          
          //});
        console.log('we are here after')

        

        
    } catch (error) {
        console.error('Error calculating usefulness score:', error);
    }
  };

   

  return (
    <form onSubmit={handleSubmit} className='form_content'>
      
      <div>
        <label>
          <input type="checkbox" name="poidsDuProfil" checked={criteresSelectionnes.poidsDuProfil} onChange={handleCheckboxChange} />
          Poids Du Profil
        </label>
        <input type="number" name="poidsDuProfil" placeholder="poids du sous critere: le poids du profil d'émetteur" value={poids.poidsDuProfil|| ''} onChange={handleInputChange} />
      </div>

      <div >
        <label>
          <input type="checkbox" name="abonnes" checked={criteresSelectionnes.abonnes} onChange={handleCheckboxChange} />
          Poids du Profil - nombre des abonnés:
        </label>
        <div className="input_part">
  
          <input type="number" name="nbAbonnesSeuil" placeholder="Seuil" value={parametres.nbAbonnesSeuil || ''} onChange={handleParametresInput} />
          <input type="number" name="nbAbonnesPoids" placeholder="poids" value={poids.nbAbonnesPoids || ''} onChange={handleInputChange} />

        </div>
      </div>
      
        <label>
          <input type="checkbox" name="typeEmetteurSelectionne" checked={criteresSelectionnes.typeEmetteurSelectionne} onChange={handleCheckboxChange} />
          Poids du Profil - type d'émetteur:
        </label>
      <div className="input_part">

          #type emtteur selectionner
          <input type="number" name="typeEmetteurPoids" placeholder="poids" value={poids.typeEmetteurPoids || ''} onChange={handleInputChange} />

        
      </div>
      <div>
        <label>  
           <input type="checkbox" name="professionSelectionne" checked={criteresSelectionnes.professionSelectionne} onChange={handleCheckboxChange} />
           Poids du Profil - profession:
        </label>
        <div className='input_part'>
        
          <input type="number" name="professionPoids" placeholder="poids" value={poids.professionPoids || ''} onChange={handleInputChange} />

        </div>
      </div>

      <div >
        <label>  
          <input type="checkbox" name="tweetPolarity" checked={criteresSelectionnes.tweetPolarity} onChange={handleCheckboxChange} />
          Polarité du tweet
          <input type="number" placeholder="poids du sous critere: polarité du message  " name="tweetPolarityPoids" value={poids.tweetPolarityPoids || ''} onChange={handleInputChange} />
        </label>
      </div>

      <div > 
       <div>
        <label>
          <input type="checkbox" name="tweetEngagement" checked={criteresSelectionnes.tweetEngagement} onChange={handleCheckboxChange} />
          Engagement Du Tweet</label>
        <input type="number" name="tweetEngagement" placeholder="poids du sous critère : engagement di tweet" value={poids.tweetEngagement || ''} onChange={handleInputChange} />
       </div>
        <label> 
           <input type="checkbox" name="likes" checked={criteresSelectionnes.likes} onChange={handleCheckboxChange} />
           engagement du tweet - likes
        </label>
        <div className='input_part'>
          <input type="number" name="likesSeuil"placeholder="seuil" value={parametres.likesSeuil || ''} onChange={handleParametresInput} />
          <input type="number" name="likesPoids" placeholder="poids" value={poids.likesPoids || ''} onChange={handleInputChange} />
        </div>
      </div>
      <div >
        <label> 
          <input type="checkbox" name="replies" checked={criteresSelectionnes.replies} onChange={handleCheckboxChange} />
          engagement du tweet - replies
        </label>
        <div className="input_part">
          <input type="number" name="repliesSeuil" placeholder="seuil" value={parametres.repliesSeuil || ''} onChange={handleParametresInput} />
          <input type="number" name="repliesPoids" placeholder="poids" value={poids.repliesPoids || ''} onChange={handleInputChange} />
        </div>
        
      </div>
      <div >
        <label>
          <input type="checkbox" name="retweets" checked={criteresSelectionnes.retweets} onChange={handleCheckboxChange} />
          engagement du tweet - retweets
        </label>
        <div className="input_part">
          <input type="number" name="retweetsSeuil" placeholder="seuil" value={parametres.retweetsSeuil || ''} onChange={handleParametresInput} />
          <input type="number" name="retweetsPoids" placeholder="poids" value={poids.retweetsPoids || ''} onChange={handleInputChange} />
        </div>
    
      </div>
      <div >
        <label>
          <input type="checkbox" name="views" checked={criteresSelectionnes.views} onChange={handleCheckboxChange} />
          engagement du tweet - views
        </label>
        <div className="input_part">
          <input type="number" name="viewsSeuil" placeholder='seuil'value={parametres.viewsSeuil || ''} onChange={handleParametresInput} />
          <input type="number" name="viewsPoids" placeholder="poids" value={poids.viewsPoids || ''} onChange={handleInputChange} />
        </div> 
      </div>

    <div className='buttons'  >

      <button type='button' onClick={() => setPartieVisible(true)}>Ajouter un critere </button>

        {partieVisible &&(
          <div>
            
            {criteresAjoutes.map((newCritere, i)=>(//iterateur pour chaque critere

           <div key={i} className='input_part'>
             <label>
              nom du critère
              <input type='text' onChange={(e)=>handleNEWcriterechange(i,e)} name="critereName" value={criteresAjoutes.critereName}></input>
            </label>
            <label>
              valeur du critère
              <input type='number' onChange={(e)=>handleNEWcriterechange(i,e)} name="critereValue" value={criteresAjoutes.critereValue}></input>
           </label>
           <label>
              Etat du critère
              <select
            name="critereEtat"
            value={criteresAjoutes.critereEtat}
            onChange={(e)=>handleNEWcriterechange(i,e)}>

                <option value="Faible">Faible</option>
                <option value="Moyen">Moyen</option>
                <option value="Fort">Fort</option>
            </select>
            
           </label>
           </div>
            ))}
          
          <button type="button" onClick={addNewCritere}>Ajouter un autre critère</button>
          </div>
        )}
      
      <button type="submit">Évaluer le Tweet</button>
      <button type="reset">Reset</button>
      {loadingPart && (
        <div className='loading'>loading...</div>
      )}
      
    </div>
      
   
    </form>
  );

}

export default TweetEvaluationForm;