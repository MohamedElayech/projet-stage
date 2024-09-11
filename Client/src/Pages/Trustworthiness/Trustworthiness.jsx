import React, { useState } from 'react';
import './Trustworthiness.css';
import { Verified } from '@mui/icons-material';
import Switch from '@mui/material/Switch';
import Result from './Result';
import axios from 'axios';

function Trustworthiness() {
  const [verified, setVerified] = useState('false');
  const [selected, setSelected] = useState(0);
  const [nombreAbonne, setNombreAbonne] = useState(0);
  const [nombreAnnee, setNombreAnnee] = useState(0);
  const [nombrePublication, setNombrePublication] = useState(0);
  const [nombreFrequence, setNombreFrequence] = useState(0);
  const [seuilAbonne, setSeuilAbonne] = useState(0);
  const [seuilAnnee, setSeuilAnnee] = useState(0);
  const [seuilPublication, setSeuilPublication] = useState(0);
  const [seuilFrequence, setSeuilFrequence] = useState(0);
  const [poidsAbonne, setPoidsAbonne] = useState(0);
  const [poidsAnnee, setPoidsAnnee] = useState(0);
  const [poidsPublication, setPoidsPublication] = useState(0);
  const [poidsFrequence, setPoidsFrequence] = useState(0);
  const [disableAbonne, setDisableAbonne] = useState(false);
  const [disableAnnee, setDisableAnnee] = useState(false);
  const [disablePublication, setDisablePublication] = useState(false);
  const [disableFrequence, setDisableFrequence] = useState(false);
  const [calcul, setCalcul] = useState(false);
  const [formulaire, setFormulaire] = useState(true);
  const [final_score, setFinal_score] = useState(0);
  const [presenceCoche, setPresenceCoche] = useState('Non');
  const [renseigneAbonne, setRenseigneAbonne] = useState('Oui');
  const [renseigneAnnee, setRenseigneAnnee] = useState('Oui');
  const [renseignePublication, setRenseignePublication] = useState('Oui');
  const [renseigneFrequence, setRenseigneFrequence] = useState('Oui');
  const [niveauAbonne, setNiveauAbonne] = useState('Moyen');
  const [niveauAnnee, setNiveauAnnee] = useState('Récent');
  const [niveauPublication, setNiveauPublication] = useState('Moyen');
  const [niveauFrequence, setNiveauFrequence] = useState('Moyen');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      verified,
      selected,
      nombreAbonne,
      nombreAnnee,
      nombrePublication,
      nombreFrequence,
      seuilAbonne,
      seuilAnnee,
      seuilPublication,
      seuilFrequence,
      poidsAbonne,
      poidsAnnee,
      poidsPublication,
      poidsFrequence,
      disableAbonne,
      disableAnnee,
      disablePublication,
      disableFrequence,
      presenceCoche,
      renseigneAbonne,
      renseigneAnnee,
      renseignePublication,
      renseigneFrequence,
      niveauAbonne,
      niveauAnnee,
      niveauPublication,
      niveauFrequence,
    };

    try {
      const response = await axios.post('http://localhost:5000/calculate_score_final', data);
      setFinal_score(response.data.final_score);
      setCalcul(true);
      setFormulaire(false);

    } catch (error) {
      console.error("There was an error making the request!", error);

    }
  };

  return (
    <React.Fragment>
      {formulaire && (
        <div className="global">
          <div className="head">Calculateur de fiabilité</div>
          <div className="cocheBleue">
            <input
              type="checkbox"
              value={verified}
              name="coche"
              className="coche"
              onChange={() => {
                setVerified(!verified);
                setCalcul(true);
                setFormulaire(false);
                setFinal_score(100);
                setPresenceCoche('Oui');
                setRenseigneAbonne('Non');
                setRenseigneAnnee('Non');
                setRenseignePublication('Non');
                setRenseigneFrequence('Non');
              }}
            />
            Presence de coche bleue <Verified className="verified-icon" />
          </div>
          {verified && (
            <form onSubmit={handleSubmit}>
              <div id="dtype-compte">
                <label htmlFor="type de compte"><p className='type'>Veuillez préciser le type de compte</p><br /></label>
                <select name="select" id="select" className="select" onChange={(e) => setSelected(parseInt(e.target.value))}>
                  <option value="0">Veuillez selectionner le type de compte</option>
                  <option value="1">Individu</option>
                  <option value="2">Entreprise</option>
                  <option value="3">Organisme international</option>
                </select>
              </div>
              {selected === 2 && (
                <div id='dtype-entreprise'>
                  <label htmlFor='type-entreprise'>Type d'entreprise</label><br />
                  <input type="radio" className='type-entreprise' name='type-entreprise' id='type-entreprise' />Petite
                  <input type="radio" className='type-entreprise' name='type-entreprise' defaultChecked />Moyenne
                  <input type="radio" className='type-entreprise' name='type-entreprise' />Grande
                </div>
              )}
              <div className="every">
                <div id="dnombre-abonne">
                  <label htmlFor="nombre-abonne"><p className='titre'>Nombre d'abonnés</p></label><br />
                  <label htmlFor="nombre-abonne">Nombre</label>
                  <input type="number" id="nombre-abonne" value={nombreAbonne} disabled={disableAbonne} onChange={(e) => setNombreAbonne(e.target.value >= 0 ? e.target.value : nombreAbonne)} />
                  <label htmlFor="seuil">Seuil</label>
                  <input type="number" id='seuil' value={seuilAbonne} onChange={(e) => setSeuilAbonne(e.target.value >= 0 ? e.target.value : seuilAbonne)} />
                  <label htmlFor="poids">Poids</label>
                  <input type="number" step='0.1' id='poids' value={poidsAbonne} onChange={(e) => setPoidsAbonne((e.target.value >= 0 && e.target.value <= 1) ? e.target.value : poidsAbonne)} />
                  <Switch className='switch' label="Top" checked={!disableAbonne} onChange={() => {
                    setDisableAbonne(!disableAbonne);
                    setSeuilAbonne(0);
                    setPoidsAbonne(0);
                    setRenseigneAbonne(renseigneAbonne === 'Oui' ? 'Non' : 'Oui');
                  }} />
                </div>
                <div id="dnombre-publications">
                  <label htmlFor="nombre-publications"><p className='titre'>Nombre de publications depuis la création du compte</p></label><br />
                  <label htmlFor="nombre-publications">Nombre</label><input type="number" id="nombre-publications" value={nombrePublication} disabled={disablePublication} onChange={(e) => { if (e.target.value >= 0) { setNombrePublication(e.target.value) } else { setNombrePublication(nombrePublication) } }} />
                  <label htmlFor="seuil">Seuil</label><input type="number" id='seuil' value={seuilPublication} onChange={(e) => { if (e.target.value >= 0) { setSeuilPublication(e.target.value) } else { setSeuilPublication(seuilPublication) } }} />
                  <label htmlFor="poids">Poids</label><input type="number" step='0.1' id='poids' value={poidsPublication} onChange={(e) => { if ((e.target.value >= 0) && (e.target.value <= 1)) { setPoidsPublication(e.target.value) } else { setPoidsPublication(poidsPublication) } }} />
                  <Switch className='switch' label="Top" defaultChecked onChange={() => { setDisablePublication(!disablePublication); setSeuilPublication(0); setPoidsPublication(0); if (renseignePublication.toLocaleLowerCase() === 'oui') { setRenseignePublication('Non'); } else { setRenseignePublication('Oui'); } }} />
                </div>

                <div id="dfrequence">
                  <label htmlFor="frequence"><p className='titre'>Frequence de publications (publications de la dernière semaine)</p></label><br />
                  <label htmlFor="frequence">Nombre</label><input type="number" id="frequence" value={nombreFrequence} disabled={disableFrequence} onChange={(e) => { if (e.target.value >= 0) { setNombreFrequence(e.target.value) } else { setNombreFrequence(nombreFrequence) } }} />
                  <label htmlFor="seuil">Seuil</label><input type="number" id='seuil' value={seuilFrequence} onChange={(e) => { if (e.target.value >= 0) { setSeuilFrequence(e.target.value) } else { setSeuilFrequence(seuilFrequence) } }} />
                  <label htmlFor="poids">Poids</label><input type="number" step='0.1' id='poids' value={poidsFrequence} onChange={(e) => { if ((e.target.value >= 0) && (e.target.value <= 1)) { setPoidsFrequence(e.target.value) } else { setPoidsFrequence(poidsFrequence) } }} />
                  <Switch className='switch' label="Top" defaultChecked onChange={() => { setDisableFrequence(!disableFrequence); setSeuilFrequence(0); setPoidsFrequence(0); if (renseigneFrequence.toLocaleLowerCase === 'oui') { setRenseigneFrequence('Non'); } else { setRenseigneFrequence('Oui') } }} />
                </div>

                <div id="dajouter-critere">
                  <button className='ajouter-critere'>Ajouter un critère</button>
                </div>
                <div id="calculer">
                  <button className='calculer' type='submit' >Calculer</button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
      <div>
        {calcul && (
          <div className="resultat">
            <Result final_score={final_score} setFinal_score={setFinal_score}
              presenceCoche={presenceCoche} setPresenceCoche={setPresenceCoche} renseigneAbonne={renseigneAbonne} renseigneAnnee={renseigneAnnee}
              renseignePublication={renseignePublication} renseigneFrequence={renseigneFrequence} niveauAbonne={niveauAbonne} setNiveauAbonne={setNiveauAbonne}
              niveauAnnee={niveauAnnee} setNiveauAnnee={setNiveauAnnee} niveauPublication={niveauPublication} setNiveauPublication={setNiveauPublication}
              niveauFrequence={niveauFrequence} setNiveauFrequence={setNiveauFrequence} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Trustworthiness;