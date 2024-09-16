import React, { useState } from "react";
import PresentationQuality from "./Pages/PresentationQuality/PresentationQuality.jsx";
import "./App.css";
import Trustworthiness from "./Pages/Trustworthiness/Trustworthiness.jsx";
import TweetEvaluationForm from "./Pages/Usefulness/Usefulness_inputs.jsx";
import Completeness from "./Pages/Completeness/Completeness.jsx";
// Le formulaire de tweet
function FormulaireTweet({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    texte: "",
    hashtags: [],
    mentions: [],
    tags: [],
    multimedia: "",
    miniature: "",
    comments: "",
    shares: "",
    likes: "",
    views: 0,
    impressions: "",
    nom_utilisateur: "",
    localisation: "",
    date_de_jointure: "",
    nombre_abonnes: "",
    nombre_abonnements: "",
    photo_profil: "",
    photo_couverture: "",
    profession: "",
    typeEmetteur:"",
    criteres:[]
  });


  const [errors, setErrors] = useState({});
  const [inputValue, setInputValue] = useState(""); // State for current input value

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddElement = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], inputValue.trim()],
    }));
    setInputValue("");
  };

  const handleRemoveElement = (field, index) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    // Validation logic here
    if (
      !formData.texte &&
      formData.hashtags.length === 0 &&
      formData.mentions.length === 0 &&
      formData.tags.length === 0 &&
      !formData.multimedia
    ) {
      newErrors.general = "Vous devez remplir au moins un champ.";
    }
    if (formData.hashtags.some((tag) => !/^#[^\s]+$/.test(tag))) {
      newErrors.hashtags =
        "Chaque hashtag doit commencer par # et ne contenir aucun espace.";
    }
    if (formData.mentions.some((mention) => !/^@[^\s]+$/.test(mention))) {
      newErrors.mentions = "Chaque mention doit commencer par @.";
    }
    if (
      formData.multimedia &&
      !/^https?:\/\/[^\s]+$/.test(formData.multimedia)
    ) {
      newErrors.multimedia =
        "L'URL de la ressource multimédia n'est pas valide.";
    }
    if (formData.multimedia && !formData.miniature) {
      newErrors.miniature =
        "La miniature doit être présente si une ressource multimédia est fournie.";
    }
    if (
      formData.comments &&
      (!Number.isInteger(Number(formData.comments)) ||
        Number(formData.comments) <= 0)
    ) {
      newErrors.comments =
        "Le nombre de commentaires doit être un nombre entier strictement positif.";
    }
    // Continue with other validations...

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const processedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          value && value.length > 0 ? value : null,
        ])
      );
      onFormSubmit(processedData);
    }
  };
  const handleaddCrit = (e) => {
   let tempfield = formData
   tempfield['criteres'].push(e)
   setFormData(tempfield)
  };
  return (
    <form onSubmit={handleSubmit} className="formulaire">
      <div>
        <label>Texte :</label>
        <input
          type="text"
          name="texte"
          value={formData.texte}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Hashtags :</label>
        {formData.hashtags.map((tag, index) => (
          <div key={index} className="tag-item">
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveElement("hashtags", index)}
              className="remove-button"
            >
              X
            </button>
          </div>
        ))}
        <input
          type="text"
          name="hashtags"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ajouter un hashtag"
        />
        <button
          type="button"
          onClick={() => handleAddElement("hashtags")}
          className="add-button"
        >
          Ajouter Hashtag
        </button>
        {errors.hashtags && <div className="error">{errors.hashtags}</div>}
      </div>

      <div>
        <label>Mentions :</label>
        {formData.mentions.map((mention, index) => (
          <div key={index} className="mention-item">
            {mention}
            <button
              type="button"
              onClick={() => handleRemoveElement("mentions", index)}
              className="remove-button"
            >
              X
            </button>
          </div>
        ))}
        <input
          type="text"
          name="mentions"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ajouter une mention"
        />
        <button
          type="button"
          onClick={() => handleAddElement("mentions")}
          className="add-button"
        >
          Ajouter Mention
        </button>
        {errors.mentions && <div className="error">{errors.mentions}</div>}
      </div>

      <div>
        <label>Tags :</label>
        {formData.tags.map((tag, index) => (
          <div key={index} className="tag-item">
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveElement("tags", index)}
              className="remove-button"
            >
              X
            </button>
          </div>
        ))}
        <input
          type="text"
          name="tags"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ajouter un tag"
        />
        <button
          type="button"
          onClick={() => handleAddElement("tags")}
          className="add-button"
        >
          Ajouter Tag
        </button>
      </div>

      <div>
        <label>Multimédia :</label>
        <input
          type="url"
          name="multimedia"
          value={formData.multimedia}
          onChange={handleChange}
          placeholder="URL de l'image/vidéo/gif"
        />
        {errors.multimedia && <div className="error">{errors.multimedia}</div>}
      </div>

      <div>
        <label>Miniature :</label>
        <input
          type="url"
          name="miniature"
          value={formData.miniature}
          onChange={handleChange}
          placeholder="URL de la miniature"
        />
        {errors.miniature && <div className="error">{errors.miniature}</div>}
      </div>

      <div>
        <label>Commentaires :</label>
        <input
          type="number"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
        />
        {errors.comments && <div className="error">{errors.comments}</div>}
      </div>

      <div>
        <label>Partages :</label>
        <input
          type="number"
          name="shares"
          value={formData.shares}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Likes :</label>
        <input
          type="number"
          name="likes"
          value={formData.likes}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Impressions :</label>
        <input
          type="number"
          name="impressions"
          value={formData.impressions}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Nom d'utilisateur :</label>
        <input
          type="text"
          name="nom_utilisateur"
          value={formData.nom_utilisateur}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Localisation :</label>
        <input
          type="text"
          name="localisation"
          value={formData.localisation}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Date de jointure :</label>
        <input
          type="date"
          name="date_de_jointure"
          value={formData.date_de_jointure}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Nombre d'abonnés :</label>
        <input
          type="number"
          name="nombre_abonnes"
          value={formData.nombre_abonnes}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Nombre d'abonnements :</label>
        <input
          type="number"
          name="nombre_abonnements"
          value={formData.nombre_abonnements}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Photo de profil :</label>
        <input
          type="text"
          name="photo_profil"
          value={formData.photo_profil}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Photo de couverture :</label>
        <input
          type="text"
          name="photo_couverture"
          value={formData.photo_couverture}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="">Professions et domaines</label>
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
      </div>
      <div>
        <label htmlFor="">Type d'émetteur</label>
      <select
                                    name="typeEmetteur"
                                    value={formData.typeEmetteur}
                                    onChange={handleInputChange}
                                >
                                    <option value="individual">Individue</option>
                                    <option value="informal group">Groupe informel</option>
                                    <option value="organization">Organisation</option>
                                    <option value="organizational unit">Unité d'organisation</option>
                                </select>
      </div>
      <div className="selection-group" style={{display:'flex',flexDirection:"column",  alignItems:"flex-start"}}>
        <span className="checkbox-container" > 
          <input type="checkbox" id="presentation-quality" name="selection" onChange={()=>{handleaddCrit("Presentation Quality")}} />
          <span className="crit">Presentation Quality</span>
        </span>
        
        <span className="checkbox-container" >
          <input type="checkbox" id="trustworthiness" name="selection" onChange={()=>{handleaddCrit("Trustworthinesss")}}  />
          <span className="crit">Trustworthiness</span>
        </span>
        
        <span className="checkbox-container"> 
          <input type="checkbox" id="usefulness" name="selection" onChange={()=>{handleaddCrit("Usefullness")}}/>
          <span className="crit">Usefullness</span>
        </span>
        
        <span className="checkbox-container">
          <input type="checkbox" id="completeness" name="selection" onChange={()=>{handleaddCrit("Completeness")}}/>
          <span className="crit">Completeness</span>
        </span>
      </div>
   

      {errors.general && <div className="error">{errors.general}</div>}
      <button type="submit">Soumettre</button>
    </form>
  );
}

// Le menu après soumission
function Menu({ onCriterionClick, crits }) {
  

  console.log(crits)
  return(

    <div className="menu-button"
          style={{  width: '50vw', display: 'flex', justifyContent: 'space-between'}}>
      {crits.map((el)=> ( <button key={el}
            className="menu-button"
            style={{ backgroundColor: "#f94144", width: '20vw' }}
            onClick={() => onCriterionClick(el)}
          >{el}</button>))}
    </div>
  )

}


function App() {
  const [view, setView] = useState("form");

  const handleCriterionClick = (criterion) => {
    if (criterion === "Presentation Quality") {
      setView("Presentation Quality");
    }
    if (criterion === "Trustworthinesss") {
      setView("Trustworthinesss");
    }
    if (criterion === "Usefullness") {
      setView("Usefullness");
    }
    if (criterion === "Completeness") {
      setView("Completeness");
    }
  };

  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (processedData) => {
    setFormData(processedData); // Enregistrer les données traitées
    setView("menu");
  };
  return (
    <div className="app-container">
       {view === "form" && !formData && (
        <FormulaireTweet onFormSubmit={handleFormSubmit} />
      )}
      {view === "menu" && <Menu onCriterionClick={handleCriterionClick} crits={formData.criteres} />}
      {view === "Trustworthinesss" && <Trustworthiness />}
      {view === "Presentation Quality" && <PresentationQuality />}
      {view === "Usefullness" && <TweetEvaluationForm />}

    </div>
  );
}

export default App;