import React from 'react'
import { Verified } from '@mui/icons-material';
import './Result.css'

function Result({ nombreAbonne, nombreAnnee, nombreFrequence, nombrePublication, final_score, setFinal_score, presenceCoche, setPresenceCoche, renseigneAbonne, setRenseigneAbonne, renseigneAnnee, setRenseigneAnnee,
    renseignePublication, setRenseignePublication, renseigneFrequence, setRenseigneFrequence, niveauAbonne, setNiveauAbonne, niveauAnnee, setNiveauAnnee, niveauPublication, setNiveauPublication, niveauFrequence, setNiveauFrequence
}) {


    return (
        <React.Fragment>
            <div className="resume">
                <span className="result">Résultats du calcul</span>
            </div>

            <div className="glob">

                <div className="resultCoche">
                    <span className="presence">Présence de la coche bleue <Verified className='verified-icon-result' /></span>
                    <span className="state">{presenceCoche}</span>
                </div>

                <div className="dEntete">
                    <table className="tEntete">
                        <tbody>
                            <tr>
                                <td>
                                    <span className="sous-critere">Sous-critère</span>
                                </td>
                                <td>
                                    <span className="niveau">Niveau</span>
                                </td>
                                <td>
                                    <span className="renseigne">Renseigné</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="dNombre-Abonne">
                    <table className="tNombre-Abonne">
                        <tbody>
                            <tr>
                                <td>
                                    <span className="Nombre-Abonne">Nombre d'abonnés</span>
                                </td>
                                <td>
                                    <span className="Abonne-Niveau">{niveauAbonne}</span>
                                </td>
                                <td>
                                    <span className="Abonne-renseignement">{renseigneAbonne}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="dNombre-Annee">
                    <table className="tNombre-Annee">
                        <tbody>
                            <tr>
                                <td>
                                    <span className="Nombre-Annee">Nombre d'années</span>
                                </td>
                                <td>
                                    <span className="Annee-Niveau">{niveauAnnee}</span>
                                </td>
                                <td>
                                    <span className="Annee-renseignement">{renseigneAnnee}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="dNombre-Publication">
                    <table className="tNombre-Publication">
                        <tbody>
                            <tr>
                                <td>
                                    <span className="Nombre-Publication">Nombre de publications</span>
                                </td>
                                <td>
                                    <span className="Publication-Niveau">{niveauPublication}</span>
                                </td>
                                <td>
                                    <span className="Publication-renseignement">{renseignePublication}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="dNombre-Frequence">
                    <table className="tNombre-Frequence">
                        <tbody>
                            <tr>
                                <td>
                                    <span className="Nombre-Frequence">Fréquence de publications</span>
                                </td>
                                <td>
                                    <span className="Frequence-Niveau">{niveauFrequence}</span>
                                </td>
                                <td>
                                    <span className="Frequence-renseignement">{renseigneFrequence}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div className="dScore-final">
                <table className="tScore-final">
                    <tbody>
                        <tr>
                            <td className="retour"><button id='retour' ><a href="/">Précédent</a></button></td>
                            <td className='text'>Score Final de Fiabilité</td>
                            <td className='score'>{final_score.toFixed(0)} %</td>
                            <td className='terminer'><button id='terminer'><a href="/">Terminer</a></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}

export default Result;