import React, { useState } from "react";
//import Completeness from "./Pages/Completeness/Completeness";
import "./App.css";
import PresentationQuality from "./Pages/PresentationQuality/PresentationQuality";

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
    impressions: "",
    nom_utilisateur: "",
    localisation: "",
    date_de_jointure: "",
    nombre_abonnes: "",
    nombre_abonnements: "",
    photo_profil: "",
    photo_couverture: "",
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
        <label >Critères selectionnés:</label>
        <span><input type="checkbox" value="Presentation Quality" /><label htmlFor="">Presentation Quality</label></span>
        <span><input type="checkbox" value="Trustworthiness" /><label htmlFor="">Trustworthiness</label></span>
        <span><input type="checkbox" value="Usefullness" /><label htmlFor="">Usefullness</label></span>
        <span><input type="checkbox" value="Completeness" /><label htmlFor="">Completeness</label></span>
      </div>

      {errors.general && <div className="error">{errors.general}</div>}
      <button type="submit">Soumettre</button>
    </form>
  );
}

// Le menu après soumission
function Menu({ onCriterionClick }) {
  return (
    <div className="menu">
      <h1>Menu des Critères</h1>
      <div className="menu-buttons">
        <button
          className="menu-button"
          style={{ backgroundColor: "#f94144" }}
          onClick={() => onCriterionClick("Completeness")}
        >
          Completeness
        </button>
        <button
          className="menu-button"
          style={{ backgroundColor: "#f3722c" }}
          onClick={() => onCriterionClick("PresentationQuality")}
        >
          Presentation Quality
        </button>
        <button
          className="menu-button"
          style={{ backgroundColor: "#f8961e" }}
          onClick={() => onCriterionClick("trust")}
        >
          Trustworthiness
        </button>
        <button
          className="menu-button"
          style={{ backgroundColor: "#f9844a" }}
          onClick={() => onCriterionClick("usefulness")}
        >
          Usefulness
        </button>
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState("form");

  const handleCriterionClick = (criterion) => {
    if (criterion === "Completeness") {
      setView("completeness");
    }
 
    if (criterion === "PresentationQuality"){
      setView("presentation")
    }
    if (criterion === "usefulness"){
      setView("usefulnes")
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
      {view === "menu" && <Menu onCriterionClick={handleCriterionClick} />}
      
      {view === "presentation" && <PresentationQuality  />}
    
    </div>
  );
}

export default App;
