import React, { useState, useEffect } from 'react';
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
    const [seuilAbonneMin, setSeuilAbonneMin] = useState(0);
    const [seuilAbonneMax, setSeuilAbonneMax] = useState(1000000000);
    const [seuilAnneeMin, setSeuilAnneeMin] = useState(0);
    const [seuilAnneeMax, setSeuilAnneeMax] = useState(20);
    const [seuilPublicationMin, setSeuilPublicationMin] = useState(0);
    const [seuilPublicationMax, setSeuilPublicationMax] = useState(1000);
    const [seuilFrequenceMin, setSeuilFrequenceMin] = useState(0);
    const [seuilFrequenceMax, setSeuilFrequenceMax] = useState(100);
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
    const [niveauAnnee, setNiveauAnnee] = useState('Recent');
    const [niveauPublication, setNiveauPublication] = useState('Moyen');
    const [niveauFrequence, setNiveauFrequence] = useState('Moyen');
    const [aggregationMethod, setAggregationMethod] = useState('');
    const [nouveau, setNouveau] = useState(0);
    const [nouveauSeuilMin, setNouveauSeuilMin] = useState(0);
    const [nouveauSeuilMax, setNouveauSeuilMax] = useState(100);
    const [poidsNouveau, setPoidsNouveau] = useState(0);
    const [disableNouveau, setDisableNouveau] = useState(false);
    const [renseigneNouveau, setRenseigneNouveau] = useState('Oui');

    function handleChangeLevel(e) {
        e.preventDefault();
        if (nombreAbonne < 2000) {
            setNiveauAbonne(niveauAbonne !== "faible" ? "faible" : niveauAbonne);
        } else if (2000 <= nombreAbonne < 10000) {
            setNiveauAbonne("Moyen");
        }
        else {
            setNiveauAbonne("Elevé");
        };

        if (nombreAnnee <= 2) {
            setNiveauAnnee("Recent");
        }
        else {
            setNiveauAbonne("Ancien");
        };
        if (nombrePublication < 10) {
            setNiveauPublication("Faible");
        }
        else if (10 <= nombrePublication < 40) {
            setNiveauPublication("Moyen");
        }
        else {
            setNiveauPublication("Elevé");
        };

        if (nombreFrequence < 5) {
            setNiveauFrequence("Faible");
        }
        else if (5 <= nombrePublication < 10) {
            setNiveauFrequence("Moyen");
        }
        else {
            setNiveauFrequence("Elevé");
        };
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            verified,
            selected,
            nombreAbonne: parseFloat(nombreAbonne),
            nombreAnnee: parseFloat(nombreAnnee),
            nombrePublication: parseFloat(nombrePublication),
            nombreFrequence: parseFloat(nombreFrequence),
            seuilAbonneMin: parseFloat(seuilAbonneMin),
            seuilAbonneMax: parseFloat(seuilAbonneMax),
            seuilAnneeMin: parseFloat(seuilAnneeMin),
            seuilAnneeMax: parseFloat(seuilAnneeMax),
            seuilPublicationMin: parseFloat(seuilPublicationMin),
            seuilPublicationMax: parseFloat(seuilPublicationMax),
            seuilFrequenceMin: parseFloat(seuilFrequenceMin),
            seuilFrequenceMax: parseFloat(seuilFrequenceMax),
            poidsAbonne: parseFloat(poidsAbonne),
            poidsAnnee: parseFloat(poidsAnnee),
            poidsPublication: parseFloat(poidsPublication),
            poidsFrequence: parseFloat(poidsFrequence),
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
            aggregationMethod,
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
                        Présence de coche bleue <Verified className="verified-icon" />
                    </div>
                    {verified && (
                        <form onSubmit={handleSubmit} className="formulaire" onChange={handleChangeLevel}>
                            <div id="dtype-compte">
                                <label htmlFor="type-de-compte">
                                    <p className='type'>Veuillez préciser le type de compte</p>
                                </label>
                                <select name="select" id="select" className="select" onChange={(e) => setSelected(parseInt(e.target.value))}>
                                    <option value="0">Veuillez sélectionner le type de compte</option>
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
                                    <input type="number" id="nombre-abonne" value={nombreAbonne} disabled={disableAbonne} onChange={(e) => { setNombreAbonne(e.target.value >= 0 ? e.target.value : nombreAbonne); }} />
                                    <label htmlFor="seuil-abonne-min">Seuil Min</label>
                                    <input type="number" id='seuil-abonne-min' value={seuilAbonneMin} onChange={(e) => setSeuilAbonneMin(e.target.value >= 0 ? e.target.value : seuilAbonneMin)} />
                                    <label htmlFor="seuil-abonne-max">Seuil Max</label>
                                    <input type="number" id='seuil-abonne-max' value={seuilAbonneMax} onChange={(e) => setSeuilAbonneMax(e.target.value >= 0 ? e.target.value : seuilAbonneMax)} />
                                    <label htmlFor="poids-abonne">Poids</label>
                                    <input type="number" step='0.1' id='poids-abonne' value={poidsAbonne} onChange={(e) => setPoidsAbonne((e.target.value >= 0 && e.target.value <= 1) ? e.target.value : poidsAbonne)} />
                                    <Switch className='switch' label="Top" defaultChecked onChange={() => {
                                        setDisableAbonne(!disableAbonne);
                                        setSeuilAbonneMin(0);
                                        setSeuilAbonneMax(0);
                                        setPoidsAbonne(0);
                                        setRenseigneAbonne(renseigneAbonne === 'Oui' ? 'Non' : 'Oui');
                                    }} />
                                </div>
                                <div id="dannee">
                                    <label htmlFor="annee"><p className='titre'>Nombre d'années (abonnés sur la plateforme)</p></label><br />
                                    <label htmlFor="annee">Nombre</label>
                                    <input type="number" id="annee" value={nombreAnnee} disabled={disableAnnee} onChange={(e) => { setNombreAnnee(e.target.value >= 0 ? e.target.value : nombreAnnee); }} />
                                    <label htmlFor="seuil-annee-min">Seuil Min</label>
                                    <input type="number" id='seuil-annee-min' value={seuilAnneeMin} onChange={(e) => setSeuilAnneeMin(e.target.value >= 0 ? e.target.value : seuilAnneeMin)} />
                                    <label htmlFor="seuil-annee-max">Seuil Max</label>
                                    <input type="number" id='seuil-annee-max' value={seuilAnneeMax} onChange={(e) => setSeuilAnneeMax(e.target.value >= 0 ? e.target.value : seuilAnneeMax)} />
                                    <label htmlFor="poids-annee">Poids</label>
                                    <input type="number" step='0.1' id='poids-annee' value={poidsAnnee} onChange={(e) => setPoidsAnnee((e.target.value >= 0 && e.target.value <= 1) ? e.target.value : poidsAnnee)} />
                                    <Switch className='switch' label="Top" defaultChecked onChange={() => {
                                        setDisableAnnee(!disableAnnee);
                                        setSeuilAnneeMin(0);
                                        setSeuilAnneeMax(0);
                                        setPoidsAnnee(0);
                                        setRenseigneAnnee(renseigneAnnee === 'Oui' ? 'Non' : 'Oui');
                                    }} />
                                </div>
                                <div id="dpublication">
                                    <label htmlFor="publication"><p className='titre'>Nombre de publications</p></label><br />
                                    <label htmlFor="publication">Nombre</label>
                                    <input type="number" id="publication" value={nombrePublication} disabled={disablePublication} onChange={(e) => { setNombrePublication(e.target.value >= 0 ? e.target.value : nombrePublication); }} />
                                    <label htmlFor="seuil-publication-min">Seuil Min</label>
                                    <input type="number" id='seuil-publication-min' value={seuilPublicationMin} onChange={(e) => setSeuilPublicationMin(e.target.value >= 0 ? e.target.value : seuilPublicationMin)} />
                                    <label htmlFor="seuil-publication-max">Seuil Max</label>
                                    <input type="number" id='seuil-publication-max' value={seuilPublicationMax} onChange={(e) => setSeuilPublicationMax(e.target.value >= 0 ? e.target.value : seuilPublicationMax)} />
                                    <label htmlFor="poids-publication">Poids</label>
                                    <input type="number" step='0.1' id='poids-publication' value={poidsPublication} onChange={(e) => setPoidsPublication((e.target.value >= 0 && e.target.value <= 1) ? e.target.value : poidsPublication)} />
                                    <Switch className='switch' label="Top" defaultChecked onChange={() => {
                                        setDisablePublication(!disablePublication);
                                        setSeuilPublicationMin(0);
                                        setSeuilPublicationMax(0);
                                        setPoidsPublication(0);
                                        setRenseignePublication(renseignePublication === 'Oui' ? 'Non' : 'Oui');
                                    }} />
                                </div>
                                <div id="dfrequence">
                                    <label htmlFor="frequence"><p className='titre'>Fréquence de publications (publications de la dernière semaine)</p></label><br />
                                    <label htmlFor="frequence">Nombre</label>
                                    <input type="number" id="frequence" value={nombreFrequence} disabled={disableFrequence} onChange={(e) => { setNombreFrequence(e.target.value >= 0 ? e.target.value : nombreFrequence); }} />
                                    <label htmlFor="seuil-frequence-min">Seuil Min</label>
                                    <input type="number" id='seuil-frequence-min' value={seuilFrequenceMin} onChange={(e) => setSeuilFrequenceMin(e.target.value >= 0 ? e.target.value : seuilFrequenceMin)} />
                                    <label htmlFor="seuil-frequence-max">Seuil Max</label>
                                    <input type="number" id='seuil-frequence-max' value={seuilFrequenceMax} onChange={(e) => setSeuilFrequenceMax(e.target.value >= 0 ? e.target.value : seuilFrequenceMax)} />
                                    <label htmlFor="poids-frequence">Poids</label>
                                    <input type="number" step='0.1' id='poids-frequence' value={poidsFrequence} onChange={(e) => setPoidsFrequence((e.target.value >= 0 && e.target.value <= 1) ? e.target.value : poidsFrequence)} />
                                    <Switch className='switch' label="Top" defaultChecked onChange={() => {
                                        setDisableFrequence(!disableFrequence);
                                        setSeuilFrequenceMin(0);
                                        setSeuilFrequenceMax(0);
                                        setPoidsFrequence(0);
                                        setRenseigneFrequence(renseigneFrequence === 'Oui' ? 'Non' : 'Oui');
                                    }} />
                                </div>
                                <div id="daggregation-method">
                                    <label htmlFor="aggregation-method"><span className='agreg'>Méthode d'agrégation</span></label><br />
                                    <select id="aggregation-method" value={aggregationMethod} onChange={(e) => setAggregationMethod(e.target.value)}>
                                        <option value="moyenne">Moyenne Pondérée</option>
                                        <option value="max">Max</option>
                                        <option value="combinaison">Combinaison Max et Moyenne</option>
                                    </select>
                                </div>
                                <div id="dajouter-critere">
                                    <button className='ajouter-critere'>Ajouter un critère</button>
                                </div>
                                <div id="calculer">
                                    <button className='calculer' type='submit'>Calculer</button>
                                </div>
                            </div>
                        </form >
                    )
                    }
                </div >
            )}
            <div>
                {calcul && (
                    <div className="resultat">
                        <Result final_score={final_score} setFinal_score={setFinal_score}
                            presenceCoche={presenceCoche} setPresenceCoche={setPresenceCoche}
                            renseigneAbonne={renseigneAbonne} renseigneAnnee={renseigneAnnee}
                            renseignePublication={renseignePublication} renseigneFrequence={renseigneFrequence}
                            niveauAbonne={niveauAbonne} setNiveauAbonne={setNiveauAbonne}
                            niveauAnnee={niveauAnnee} setNiveauAnnee={setNiveauAnnee}
                            niveauPublication={niveauPublication} setNiveauPublication={setNiveauPublication}
                            niveauFrequence={niveauFrequence} setNiveauFrequence={setNiveauFrequence} nombreAbonne={nombreAbonne}
                            nombreAnnee={nombreAnnee} nombrePublication={nombrePublication} nombreFrequence={nombreFrequence}
                        />
                    </div>
                )}
            </div>


        </React.Fragment >
    );

}

export default Trustworthiness;

