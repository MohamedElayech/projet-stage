import React, { useState } from 'react';
import axios from 'axios';
import './trustworthiness.css'

function App() {
  const [abonnés, setAbonnés] = useState('');
  const [dateCreation, setDateCreation] = useState('');
  const [postesPublies, setPostesPublies] = useState('');
  const [frequencePublication, setFrequencePublication] = useState('');
  const [score, setScore] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/calculer_score', {
        abonnés: parseFloat(abonnés),
        date_creation: parseFloat(dateCreation),
        postes_publies: parseFloat(postesPublies),
        frequence_publication: parseFloat(frequencePublication)
      });
      setScore(response.data.score);
    } catch (error) {
      console.error('Erreur lors de la soumission des données', error);
    }
  };

  return (
    <div>
      <h1>Calculateur de Fiabilité</h1>
      <div>
        <label>
          Nombre d’Abonnés:
          <input
            type="number"
            value={abonnés}
            onChange={(e) => {
              if (e.target.value >= 0) { setAbonnés(e.target.value) }
              else {
                setAbonnés(0);
              }
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Date de Création du Compte (en années):
          <input
            type="number"
            value={dateCreation}
            onChange={(e) => {
              if (e.target.value >= 0 && e.target.value <= 10) { setDateCreation(e.target.value) }
              else {
                setDateCreation(dateCreation);
              }
            }

            }
          />
        </label>
      </div>
      <div>
        <label>
          Nombre de Postes Publiés:
          <input
            type="number"
            value={postesPublies}
            onChange={(e) => {
              if (e.target.value >= 0) { setPostesPublies(e.target.value) }
              else {
                setPostesPublies(0);
              }
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Fréquence de Publication (postes par semaine):
          <input
            type="number"
            value={frequencePublication}
            onChange={(e) => {
              if (e.target.value >= 0) { setFrequencePublication(e.target.value) }
              else {
                setFrequencePublication(0);
              }
            }}
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Calculer</button>
      {score !== null && (
        <div>
          <h2>Score de Fiabilité: {score.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
