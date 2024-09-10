import React, { useState } from 'react';
import './ResultComponent.css' ;


function ResultComponent({result}) {
  const [resultDetails,setResultDetails]=useState(false);
  
  
  console.log('result pagee');
  


  

  return (
    <div className='result_part'>
      <h1>Tableau de Bord</h1>
      <table>
        <thead>
        
        </thead>
        <tbody>
          <tr>
            <td><label>Usefulness</label></td>
            <td>{result.usefulness_etat}</td>
            <td>{result.usefulness_score}</td>
          </tr>
          <tr>
            <td><label>Poids Du Profil</label></td>
            <td>{result.poidsDuProfil_etat}</td>
            <td>{result.poidsDuProfil_score}</td>
          </tr>
          <tr>
            <td><label>Polarité du message: {result.polarity_sentiment}</label> </td>
            <td>{result.polarity_etat}</td>
            <td>{result.polarity_score}</td>
          </tr>
          <tr>
            <td><label>Engagement</label></td>
            <td>{result.engagement_etat}</td>
            <td>{result.engagement_score}</td>
          </tr>


        </tbody>
      </table>
     
      <button onClick={()=>setResultDetails(true)} >Afficher plus de détails</button>
      {resultDetails &&(
        <div >
          <table>
        <thead>
        
        </thead>
        <tbody>
          <tr>
            <td><label>Nombre d'abonnés</label></td>
            <td>{result.abonnes_etat}</td>
            <td>{result.abonnes_score}</td>
          </tr>
          <tr>
            <td><label>Type d'émetteur</label></td>
            <td>{result.type_emetteur_etat}</td>
            <td>{result.type_emetteur_score}</td>
          </tr>
          <tr>
            <td><label>Profession</label></td>
            <td>{result.profession_etat}</td>
            <td>{result.profession_score}</td>
          </tr>
          <tr><label>Engagement</label></tr>
          <tr>
            <td><label>Likes</label></td>
            <td>{result.likes_etat}</td>
            <td>{result.likes_score}</td>
          </tr>
          <tr>
            <td><label>Replies</label></td>
            <td>{result.replies_etat}</td>
            <td>{result.replies_score}</td>
          </tr>
          <tr>
            <td><label>Retweets</label></td>
            <td>{result.retweets_etat}</td>
            <td>{result.retweets_score}</td>
          </tr>
          


        </tbody>
      </table>
      </div>

      )}
        


  
      

    </div>
  );
}

export default ResultComponent;
