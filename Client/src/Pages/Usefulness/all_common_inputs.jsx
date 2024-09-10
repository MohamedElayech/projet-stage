import "./all_common_input.css";
import React, { useState } from 'react';

export function Tweetinputs() {
    const [formData, setFormData] = useState({
        nbAbonnes: '',
        profession: '',
        dateCreation: '',
        likes: '',
        postesPublies: '',
        replies: '',
        frequencePublication: '',
        retweets: '',
        typeEmetteur: '',
        views: '',
        usefulness: false,
        presentationQuality: false,
        completeness: false,
        trustworthiness: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <form className="form_content">
            <div className="input_part">
                <label>Texte du tweet</label>
                <textarea
                    name="tweetText"
                    placeholder="Tweet text"
                    value={formData.tweetText}
                    onChange={handleInputChange}
                />
            </div>
            <div className="input_part">
                <table className="table1">
                    <tbody>
                        <tr>
                            <td>Nombre d'abonnés</td>
                            <td>
                                <input
                                    type="number"
                                    name="nbAbonnes"
                                    placeholder="nombre d'abonnés"
                                    value={formData.nbAbonnes}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>Profession et Domaine</td>
                            <td>
                                <select
                                    name="profession"
                                    value={formData.profession}
                                    onChange={handleInputChange}
                                >
                                    <option value="Influenceurs et Célébrités">Influenceurs et Célébrités</option>
                                    <option value="Influenceurs et Célébrités">Divertissement</option>
                                    <option value="Journalistes">Journalisme</option>
                                    <option value="Politiciens">Politique</option>
                                    <option value="Activistes">Activistes</option>
                                    <option value="Scientifiques et Experts">Science et Expertise</option>
                                    <option value="Avocats et Juristes">Droit</option>
                                    <option value="Académiciens et Professeurs">Professeurs</option>
                                    <option value="Académiciens et Professeurs">Domaine Académique</option>
                                    <option value="Professionnels de la Santé">La Santé</option>
                                    <option value="Travailleurs Sociaux">Travail social</option>
                                    <option value="Ingénieurs">Ingénierie</option>
                                    <option value="étudiant">Etudiant</option>
                                    <option value="Artistes et Créateurs">Art et Creation</option>
                                    <option value="Commerçants et Entrepreneurs Indépendants">Commerce et Entrepreneuriat</option>
                                    <option value="Consultants en Management">Finance et Management</option>
                                    <option value="inconnue">Inconnu</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Date de Création du Compte (en années):</td>
                            <td>
                                <input
                                    type="number"
                                    name="dateCreation"
                                    value={formData.dateCreation}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>Nombre de likes :</td>
                            <td>
                                <input
                                    type="number"
                                    name="likes"
                                    placeholder="nombre de likes"
                                    value={formData.likes}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre de Postes Publiés:</td>
                            <td>
                                <input
                                    type="number"
                                    name="postesPublies"
                                    value={formData.postesPublies}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>Nombre de replies :</td>
                            <td>
                                <input
                                    type="number"
                                    name="replies"
                                    placeholder="nombres de commentaires"
                                    value={formData.replies}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Fréquence de Publication (postes par semaine):</td>
                            <td>
                                <input
                                    type="number"
                                    name="frequencePublication"
                                    value={formData.frequencePublication}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>Nombre de retweets :</td>
                            <td>
                                <input
                                    type="number"
                                    name="retweets"
                                    placeholder="nombre de partage"
                                    value={formData.retweets}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Type d'Emetteur</td>
                            <td>
                                <select
                                    name="typeEmetteur"
                                    value={formData.typeEmetteur}
                                    onChange={handleInputChange}
                                >
                                    <option value="individual">Individual</option>
                                    <option value="informal group">Informal Group</option>
                                    <option value="organization">Organization</option>
                                    <option value="organizational unit">Organizational Unit</option>
                                </select>
                            </td>
                            <td>Nombre de vues :</td>
                            <td>
                                <input
                                    type="number"
                                    name="views"
                                    placeholder="nombre de vues"
                                    value={formData.views}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="input_part">
                <div className="checklist">
                    <label>Usefulness</label>
                    <input
                        type="checkbox"
                        name="usefulness"
                        checked={formData.usefulness}
                        onChange={handleInputChange}
                    />
                    <label>Presentation Quality</label>
                    <input
                        type="checkbox"
                        name="presentationQuality"
                        checked={formData.presentationQuality}
                        onChange={handleInputChange}
                    />
                    <label>Completeness</label>
                    <input
                        type="checkbox"
                        name="completeness"
                        checked={formData.completeness}
                        onChange={handleInputChange}
                    />
                    <label>Trustworthiness</label>
                    <input
                        type="checkbox"
                        name="trustworthiness"
                        checked={formData.trustworthiness}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </form>
    );
}
