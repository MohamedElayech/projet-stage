import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './usefulness_inputs.css'
import ResultComponent from './ResultComponent';


function TweetEvaluationForm() {

  const [usefulnessScore, setUsefulnessScore] = useState({
    engagement_score: 0,
    profil_score: 0,
    polarity_score: 0
  });

  const [poids, setPoids] = useState({
    poidsDuProfil: 0,
    nbAbonnesPoids: 0,
    typeEmetteurPoids: 0,
    professionPoids: 0,

    tweetPolarityPoids: 0,

    tweetEngagement: 0,
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

    poidsDuProfil: false,
    abonnes: false,
    typeEmetteurSelectionne: false,
    professionSelectionne: false,

    tweetPolarity: false,

    tweetEngagement: false,
    likes: false,
    replies: false,
    retweets: false,
    views: false,
    methode1: false,
    methode2: false

  });
  const [partieVisible, setPartieVisible] = useState(false)
  const [criteresAjoutes, setCriteresAjoutes] = useState([{ critereName: '', critereValue: 0, critereEtat: 'indéfini' }]);
  const ajouteCritere = ()=>{
    setCriteresAjoutes([...criteresAjoutes,{critereName:'',critereValue:0,critereEtat:'indéfini'}])
 }
  const handleNEWcriterechange = (i, e) => {
    const { name, value } = e.target;
    const newcriteres = [...criteresAjoutes];
    newcriteres[i][name] = value;
    setCriteresAjoutes(newcriteres)

  }
  const supprimeCritere = (index) => {
    const updatedCriteres = criteresAjoutes.filter((_, i) => i !== index);
    setCriteresAjoutes(updatedCriteres);
  };
const handleselectMethodChange = (e) => {
  const { name } = e.target;
  setCriteresSelectionnes((prevSelection) =>({
    ...prevSelection,
    methode1: name === 'methode1' ? !criteresSelectionnes.methode1 : false,
    methode2: name === 'methode2' ? !criteresSelectionnes.methode2 : false,
  }));
};
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
    } else {
      setParametres(prevParams => ({
        ...prevParams,
        [name]: value
      }))
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {

      criteresSelectionnes,
      poids,
      parametres,
      criteresAjoutes,
    };

    try {
      console.log('we are here')
      const response = await axios.post('/api/evaluate_tweet', data);
      const databack = response.data;


      console.log(databack);



      setUsefulnessScore({
        engagement_score: databack.engagement_score,
        profil_score: databack.profil_score,
        polarity_score: databack.polarity_score

      });
      console.log('we are here after')




    } catch (error) {
      console.error('Error calculating usefulness score:', error);
    }
  };



  return (
    <form onSubmit={handleSubmit} className='form_content'>


      <div className='input_part'>
        <table className='table3' border='1'>
          <thead>
            <th>          <input type="checkbox" name="poidsDuProfil" checked={criteresSelectionnes.poidsDuProfil} onChange={handleCheckboxChange} />

              <label>Poids du profil</label>
            </th>
            <th>
              <input type="checkbox" name="tweetPolarity" checked={criteresSelectionnes.tweetPolarity} onChange={handleCheckboxChange} />
              Polarité du tweet
            </th>
          </thead>
          <tbody>

            <td>
              <tr>
                <td>          <input type="checkbox" name="abonnes" checked={criteresSelectionnes.abonnes} onChange={handleCheckboxChange} />
                  <label>Nombre d'abonnés</label></td>
                <td><label>Seuil du nombre d'abonnés:</label></td>
                <td>          <input type="number"  min="0" name="nbAbonnesSeuil" placeholder="Seuil" value={parametres.nbAbonnesSeuil || ''} onChange={handleInputChange} />
                </td>
                <td>
                  <label>Poids du nombre d'abonnés</label>
                </td>
                <td> <input type="number" min="0" name="nbAbonnesPoids" placeholder="poids" value={poids.nbAbonnesPoids || ''} onChange={handleInputChange} /></td>

              </tr>
              <tr>
                <td> 
                  <input type="checkbox" name="typeEmetteurSelectionne" checked={criteresSelectionnes.typeEmetteurSelectionne} onChange={handleCheckboxChange} />
                  Type d'émetteur:
                  </td>
                <td><label>poids du type d'emetteur</label></td>
                <td><input type="number" min="0" name="typeEmetteurPoids" placeholder="poids" value={poids.typeEmetteurPoids || ''} onChange={handleInputChange} />
                </td>
                <td><label>Le poids du critère: poids de profil</label></td>
                <td><input type="number" min="0" name="poidsDuProfil" placeholder="poids du sous critere: le poids du profil d'émetteur" value={poids.poidsDuProfil || ''} onChange={handleInputChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" name="professionSelectionne" checked={criteresSelectionnes.professionSelectionne} onChange={handleCheckboxChange} />
                  <label>Profession:</label>
                </td>
                <td><label>poids de Profession</label> </td>
                <td><input type="number" min="0" name="professionPoids" placeholder="poids" value={poids.professionPoids || ''} onChange={handleInputChange} />
                </td>
              </tr></td>
            <td><label>Le poids du critère:</label>

              <input type="number" min="0" placeholder="poids du sous critere: polarité du message  " name="tweetPolarityPoids" value={poids.tweetPolarityPoids || ''} onChange={handleInputChange} />

            </td>
          </tbody>
        </table>

      </div>



      //engagement
      <div className='input_part'>
        <div className='critere_titre'>
          <input type="checkbox" name="tweetEngagement" checked={criteresSelectionnes.tweetEngagement} onChange={handleCheckboxChange} />
          <label>Engagement Du Tweet </label>
          <label>le poids du critère :</label>
          <input type="number" min="0" name="tweetEngagement" placeholder="poids du sous critère : engagement di tweet" value={poids.tweetEngagement || ''} onChange={handleInputChange} />

        </div>

        <table border="1" className='table2'>
          <thead>
            <th></th>
            <th>Seuil</th>
            <th>Poids</th>
            <th></th>
            <th>Seuil</th>
            <th>Poids</th>

          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" name="likes" checked={criteresSelectionnes.likes} onChange={handleCheckboxChange} />
                Nombre de Likes</td>
              <td><input type="number" min="0" name="likesSeuil" placeholder="seuil" value={parametres.likesSeuil || ''} onChange={handleInputChange} /></td>
              <td> <input type="number" min="0" name="likesPoids" placeholder="poids" value={poids.likesPoids || ''} onChange={handleInputChange} /></td>
              <td><input type="checkbox" name="replies" checked={criteresSelectionnes.replies} onChange={handleCheckboxChange} />
                Nombre de Replies</td>
              <td><input type="number" min="0" name="repliesSeuil" placeholder="seuil" value={parametres.repliesSeuil || ''} onChange={handleInputChange} />
              </td>
              <td><input type="number" min="0" name="repliesPoids" placeholder="poids" value={poids.repliesPoids || ''} onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>
                  <input type="checkbox" name="retweets" checked={criteresSelectionnes.retweets} onChange={handleCheckboxChange} />
                  Nombre de Retweets</td>
              <td><input type="number" min="0" name="retweetsSeuil" placeholder="seuil" value={parametres.retweetsSeuil || 500} onChange={handleInputChange} /></td>
              <td><input type="number" min="0" name="retweetsPoids" placeholder="poids" value={poids.retweetsPoids || ''} onChange={handleInputChange} /></td>
              <td>Methode de calcul</td>
              <td>
                <input type="checkbox" name="methode1" checked={criteresSelectionnes.methode1} onChange={handleselectMethodChange} />
                D'apres les facteurs
              </td>
              <td>
                <input type="checkbox" name="methode2" checked={criteresSelectionnes.methode2} onChange={handleselectMethodChange} />
                Formule de taux d'engagement
              </td>

            </tr>
          </tbody>
        </table></div>



      <div className='buttons'  >


        {partieVisible && (
          <div>

            {criteresAjoutes.map((newCritere, i) => (//iterateur pour chaque critere

              <div key={i} className='new_critere'>
                <table className='table4'>
                  <td> <label>Nom du critère</label></td>
                  <td><input type='text' onChange={(e) => handleNEWcriterechange(i, e)} name="critereName" value={criteresAjoutes.critereName}></input>
                  </td>
                  <td><label>Valeur du critère</label></td>
                  <td> <input type='number' onChange={(e) => handleNEWcriterechange(i, e)} name="critereValue" value={criteresAjoutes.critereValue}></input>
                  </td>
                  <td><label>Niveau du critère</label></td>
                  <td> <select
                    name="critereEtat"
                    value={criteresAjoutes.critereEtat}
                    onChange={(e) => handleNEWcriterechange(i, e)}>

                    <option value="Faible">Faible</option>
                    <option value="Moyen">Moyen</option>
                    <option value="Fort">Fort</option>
                  </select></td>
                </table>
                <button type="button" onClick={()=>supprimeCritere(i)}>Supprimer le critère</button>


              </div>
            ))}

            <button type="button" onClick={ajouteCritere}>Ajouter un autre critère</button>
          </div>
        )}
       <div className='buttons'>
        <button type='button' onClick={() => setPartieVisible(true)}>Ajouter un critere </button>
        <button type="submit">Évaluer le Tweet</button>
        <button type="reset">Reset</button>
       </div>

      </div>

      {result && <ResultComponent result={result} />}

    </form>
  );

}

export default TweetEvaluationForm;