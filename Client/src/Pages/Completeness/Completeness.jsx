import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Completeness.css";
import { Pie } from "react-chartjs-2"; // Assurez-vous d'avoir installé react-chartjs-2 et chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import GaugeChart from "react-gauge-chart"; // Importer la jauge

ChartJS.register(ArcElement, Tooltip, Legend);

const Completeness = ({ formData }) => {
  const [selectedCriterion, setSelectedCriterion] = useState(1);
  const [selectedSubCriteria1, setSelectedSubCriteria1] = useState([]);
  const [selectedSubCriteria2, setSelectedSubCriteria2] = useState([]);
  const [step, setStep] = useState(1);
  const [isDefaultMode, setIsDefaultMode] = useState(true);
  const [weights, setWeights] = useState({
    criterion1: {},
    criterion2: {},
  });
  const [allWeightsFilled, setAllWeightsFilled] = useState(false);
  const [values, setValues] = useState({});

  const [aggregationMethod, setAggregationMethod] = useState("");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!isDefaultMode) {
      checkAllWeightsFilled();
    }
  }, [weights, selectedSubCriteria1, selectedSubCriteria2, isDefaultMode]);

  const [isFinalStepEnabled, setIsFinalStepEnabled] = useState(false);

  useEffect(() => {
    setIsFinalStepEnabled(validateConditions());
  }, [values, selectedSubCriteria1, selectedSubCriteria2]);

  const handleCriterionChange = (criterion) => {
    setSelectedCriterion(criterion);
  };

  const handleSubCriteriaChange = (criterion, subCriterion) => {
    if (criterion === 1) {
      setSelectedSubCriteria1((prev) =>
        prev.includes(subCriterion)
          ? prev.filter((item) => item !== subCriterion)
          : [...prev, subCriterion]
      );
    } else {
      setSelectedSubCriteria2((prev) =>
        prev.includes(subCriterion)
          ? prev.filter((item) => item !== subCriterion)
          : [...prev, subCriterion]
      );
    }
  };

  // Définir les fonctions fuzzy avant la fonction calc
  function mu_absent(x) {
    return x === 0 ? 1.0 : 0.0;
  }

  function mu_partiellement_complet(x, s_min, s_max) {
    if (x <= s_min) {
      return 0.0;
    } else if (x > s_min && x <= s_max) {
      return (x - s_min) / (s_max - s_min);
    } else {
      return 1.0;
    }
  }

  function mu_complet(x, c_min, c_max) {
    if (x <= c_min) {
      return 0.0;
    } else if (x > c_min && x <= c_max) {
      return (x - c_min) / (c_max - c_min);
    } else {
      return 1.0;
    }
  }

  const [resultats1, setResultats1] = useState({});
  const [resultats2, setResultats2] = useState({});

  function calc(data, sub_criteria) {
    console.log("Data:", data); // Affiche les données pour vérifier leur structure

    if (!data) {
      console.error("Data is undefined");
      return {};
    }

    const results = {};

    sub_criteria.forEach(([criterion, [s_min, s_max, c_min, c_max]]) => {
      console.log("Criterion:", criterion); // Affiche le critère pour vérifier
      console.log("Value:", data[criterion]); // Affiche la valeur pour le critère

      if (!data[criterion]) {
        console.warn(`Data for criterion '${criterion}' is undefined`);
        results[criterion] = 0.0; // Valeur par défaut
        return;
      }

      const value = data[criterion];
      let x = 0;
      if (typeof value === "number") {
        x = value;
      } else if (typeof value === "string") {
        x = value.trim().length;
      } else if (Array.isArray(value)) {
        x = value.length;
      }

      const mu_abs = mu_absent(x);
      const mu_part_complet = mu_partiellement_complet(x, s_min, s_max);
      const mu_complet_val = mu_complet(x, c_min, c_max);

      results[criterion] = Math.max(mu_abs, mu_part_complet, mu_complet_val);
    });

    return results;
  }

  {
    /*
  const handleStepChange = async (newStep) => {
    if (newStep === 4) {
      try {
        // Préparer les données pour sub_criteria1
        const sub_criteria1 = selectedSubCriteria1.map((subCriterion) => {
          const { s_min, s_max, c_min, c_max } = values[subCriterion] || {};
          return [subCriterion, [s_min, s_max, c_min, c_max]];
        });

        // Préparer les données pour sub_criteria2
        const sub_criteria2 = selectedSubCriteria2.map((subCriterion) => {
          const { s_min, s_max, c_min, c_max } = values[subCriterion] || {};
          return [subCriterion, [s_min, s_max, c_min, c_max]];
        });

        // Combiner les données des deux sous-critères dans un seul objet
        const payload = {
          formData,
          sub_criteria1,
          sub_criteria2,
        };

        // Envoyer une seule requête POST au backend avec les deux sous-critères
        const response = await axios.post("/calculate", payload);

        // Mettre à jour les résultats après avoir reçu la réponse
        setResultats1(response.data.resultats1);
        setResultats2(response.data.resultats2);

        // Passer à l'étape 4 après avoir obtenu les résultats
        setStep(4);
      } catch (error) {
        console.error("Error during calculation:", error);
        alert("Une erreur est survenue pendant le calcul. Veuillez réessayer.");
      }
    } else {
      setStep(newStep);
    }
  };

*/
  }
  const handleStepChange = async (newStep) => {
    if (newStep === 4) {
      // Préparer les données pour sub_criteria1
      const sub_criteria1 = selectedSubCriteria1.map((subCriterion) => {
        const { s_min, s_max, c_min, c_max } = values[subCriterion] || {};
        return [subCriterion, [s_min, s_max, c_min, c_max]];
      });

      // Préparer les données pour sub_criteria2
      const sub_criteria2 = selectedSubCriteria2.map((subCriterion) => {
        const { s_min, s_max, c_min, c_max } = values[subCriterion] || {};
        return [subCriterion, [s_min, s_max, c_min, c_max]];
      });

      // Calculer les résultats
      const resultats1 = calc(formData, sub_criteria1);
      const resultats2 = calc(formData, sub_criteria2);

      // Mettre à jour l'état avec les résultats calculés
      setResultats1(resultats1);
      setResultats2(resultats2);

      // Passer à l'étape 4 après avoir obtenu les résultats
      setStep(4);
    } else {
      setStep(newStep);
    }
  };

  const handleModeChange = (mode) => {
    setIsDefaultMode(mode === "default");
    if (mode === "default") {
      handleStepChange(3);
    } else {
      handleStepChange(2);
    }
  };

  const handleWeightChange = (criterion, subCriterion, value) => {
    setWeights((prev) => ({
      ...prev,
      [criterion]: {
        ...prev[criterion],
        [subCriterion]: value,
      },
    }));
  };

  const checkAllWeightsFilled = () => {
    const allWeightsFilled =
      selectedSubCriteria1.every(
        (subCriterion) =>
          weights.criterion1[subCriterion] !== undefined &&
          weights.criterion1[subCriterion] !== ""
      ) &&
      selectedSubCriteria2.every(
        (subCriterion) =>
          weights.criterion2[subCriterion] !== undefined &&
          weights.criterion2[subCriterion] !== ""
      );
    setAllWeightsFilled(allWeightsFilled);
  };

  const handleValueChange = (subCriterion, field, value) => {
    setValues((prev) => ({
      ...prev,
      [subCriterion]: {
        ...prev[subCriterion],
        [field]: value,
      },
    }));
  };
  const [newCritere, setNewCritere] = useState("");
  const [newScore, setNewScore] = useState("");

  // Fonction pour ajouter un sous-critère à resultats1
  const addCritere1 = () => {
    if (newCritere && newScore) {
      setResultats1((prevResultats1) => ({
        ...prevResultats1,
        [newCritere]: newScore,
      }));
      setNewCritere(""); // Réinitialise le champ
      setNewScore(""); // Réinitialise le champ
    }
  };

  // Fonction pour ajouter un sous-critère à resultats2
  const addCritere2 = () => {
    if (newCritere && newScore) {
      setResultats2((prevResultats2) => ({
        ...prevResultats2,
        [newCritere]: newScore,
      }));
      setNewCritere(""); // Réinitialise le champ
      setNewScore(""); // Réinitialise le champ
    }
  };

  const validateConditions = () => {
    for (const subCriterion of [
      ...selectedSubCriteria1,
      ...selectedSubCriteria2,
    ]) {
      const s_min = parseFloat(values[subCriterion]?.s_min);
      const s_max = parseFloat(values[subCriterion]?.s_max);
      const c_min = parseFloat(values[subCriterion]?.c_min);
      const c_max = parseFloat(values[subCriterion]?.c_max);

      if (
        isNaN(s_min) ||
        isNaN(s_max) ||
        isNaN(c_min) ||
        isNaN(c_max) ||
        !(s_min < s_max && s_max < c_min && c_min < c_max)
      ) {
        return false;
      }
    }
    return true;
  };

  const [valeur1, setValeur1] = useState(0);
  const [valeur2, setValeur2] = useState(0);

  const handleSubmit = () => {
    const mode = isDefaultMode ? "default" : "modified"; // Utiliser l'état isDefaultMode pour déterminer le mode
    const listesResultats1 = []; // Liste des tuples pour critère 1
    const listesResultats2 = []; // Liste des tuples pour critère 2

    // Construire les listes de tuples (nom sous_critere, score, ponderation)
    if (mode === "default") {
      const ponderation1 = 1 / Object.keys(resultats1).length;
      const ponderation2 = 1 / Object.keys(resultats2).length;

      Object.entries(resultats1).forEach(([critere, score]) => {
        if (critere && score) {
          listesResultats1.push([critere, score, ponderation1]);
        }
      });

      Object.entries(resultats2).forEach(([critere, score]) => {
        if (critere && score) {
          listesResultats2.push([critere, score, ponderation2]);
        }
      });
    } else {
      Object.entries(resultats1).forEach(([critere, score]) => {
        if (critere && score) {
          const ponderation =
            weights.criterion1[critere] ||
            prompt(
              `Entrez la pondération pour le sous-critère ${critere} de critère 1 :`
            );
          // Boucle pour valider que la pondération est entre 0 et 1
          while (ponderation < 0 || ponderation > 1 || isNaN(ponderation)) {
            ponderation = prompt(
              `La pondération pour le sous-critère ${critere} doit être comprise entre 0 et 1. Veuillez entrer une nouvelle valeur :`
            );
          }
          listesResultats1.push([critere, score, ponderation]);
        }
      });

      Object.entries(resultats2).forEach(([critere, score]) => {
        if (critere && score) {
          const ponderation =
            weights.criterion2[critere] ||
            prompt(
              `Entrez la pondération pour le sous-critère ${critere} de critère 2 :`
            );
          // Boucle pour valider que la pondération est entre 0 et 1
          while (ponderation < 0 || ponderation > 1 || isNaN(ponderation)) {
            ponderation = prompt(
              `La pondération pour le sous-critère ${critere} doit être comprise entre 0 et 1. Veuillez entrer une nouvelle valeur :`
            );
          }
          listesResultats2.push([critere, score, ponderation]);
        }
      });
    }

    // Calculer valeur1 et valeur2
    const calculatedValeur1 = listesResultats1.reduce(
      (acc, [_, score, ponderation]) => acc + score * ponderation,
      0
    );
    const calculatedValeur2 = listesResultats2.reduce(
      (acc, [_, score, ponderation]) => acc + score * ponderation,
      0
    );

    // Mettre à jour les états
    setValeur1(calculatedValeur1);
    setValeur2(calculatedValeur2);

    // Afficher les valeurs calculées
    console.log("Valeur1:", calculatedValeur1);
    console.log("Valeur2:", calculatedValeur2);

    // Passer à l'étape 5
    setStep(5);

    console.log("Liste des résultats pour critère 1:", listesResultats1);
    console.log("Liste des résultats pour critère 2:", listesResultats2);
  };

  const handleSubmitAggregation = () => {
    if (aggregationMethod) {
      let result;
      switch (aggregationMethod) {
        case "sum":
          result = valeur1 + valeur2;
          break;
        case "average":
          result = (valeur1 + valeur2) / 2;
          break;
        case "max":
          result = Math.max(valeur1, valeur2);
          break;
        default:
          result = 0;
      }

      // Préparer les données pour le graphique circulaire
      setChartData({
        labels: [
          "Complétude du contenu du tweet",
          "Complétude des métadonnées du profil",
        ],
        datasets: [
          {
            data: [valeur1, valeur2],
            backgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      });
      // Enregistrer la valeur de result pour la jauge
      setGaugeValue(result); // Normaliser la valeur pour la jauge (entre 0 et 1)

      // Vous pouvez également utiliser `result` pour d'autres traitements si nécessaire
      console.log("Result:", result);
    }
  };

  // Ajoute l'état pour stocker la valeur de la jauge
  const [gaugeValue, setGaugeValue] = useState(0);

  const isSubmitEnabled = () => {
    return selectedSubCriteria1.length > 0 && selectedSubCriteria2.length > 0;
  };

  return (
    <div className="container">
      {step === 1 && (
        <div className="step1">
          <button
            className={`criterion-button ${
              selectedCriterion === 1 ? "active" : ""
            }`}
            onClick={() => handleCriterionChange(1)}
          >
            Critère 1
          </button>
          <button
            className={`criterion-button ${
              selectedCriterion === 2 ? "active" : ""
            }`}
            onClick={() => handleCriterionChange(2)}
          >
            Critère 2
          </button>

          <div
            id="criterium1-options"
            className={`criterium-options ${
              selectedCriterion === 1 ? "" : "hidden"
            }`}
          >
            <h3>Sous-critères du Critère 1</h3>
            {[
              "texte",
              "hashtags",
              "mentions",
              "multimedia", // Renommé de "Médias (photos/vidéos/gifs)" pour correspondre
            ].map((subCriterion) => (
              <label
                className="checkbox-container criterion1"
                key={subCriterion}
              >
                {subCriterion.charAt(0).toUpperCase() + subCriterion.slice(1)}
                <input
                  type="checkbox"
                  className="sub-criterium"
                  checked={selectedSubCriteria1.includes(subCriterion)}
                  onChange={() => handleSubCriteriaChange(1, subCriterion)}
                />
                <span className="checkmark"></span>
              </label>
            ))}
          </div>

          <div
            id="criterium2-options"
            className={`criterium-options ${
              selectedCriterion === 2 ? "" : "hidden"
            }`}
          >
            <h3>Sous-critères du Critère 2</h3>
            {[
              "nom_utilisateur",
              "localisation",
              "date_de_jointure",
              "photo_profil",
              "photo_couverture",
              "nombre_abonnes",
              "nombre_abonnements",
            ].map((subCriterion) => (
              <label
                className="checkbox-container criterion2"
                key={subCriterion}
              >
                {subCriterion
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                <input
                  type="checkbox"
                  className="sub-criterium"
                  checked={selectedSubCriteria2.includes(subCriterion)}
                  onChange={() => handleSubCriteriaChange(2, subCriterion)}
                />
                <span className="checkmark"></span>
              </label>
            ))}
          </div>

          <button
            className="submit-button"
            disabled={!isSubmitEnabled()}
            onClick={() => handleStepChange(2)}
          >
            Soumettre
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="step2">
          <button
            className={`default-button ${isDefaultMode ? "active" : ""}`}
            onClick={() => handleModeChange("default")}
          >
            Par défaut
          </button>
          <button
            className={`modified-button ${!isDefaultMode ? "active" : ""}`}
            onClick={() => handleModeChange("modified")}
          >
            Modifié
          </button>

          {!isDefaultMode && (
            <div className="weights">
              <div className="subcriteria criterion1">
                <h3>Pondération Critère 1</h3>
                {selectedSubCriteria1.map((subCriterion) => (
                  <div key={subCriterion}>
                    <label>{subCriterion}</label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      value={weights.criterion1[subCriterion] || ""}
                      onChange={(e) =>
                        handleWeightChange(
                          "criterion1",
                          subCriterion,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="subcriteria criterion2">
                <h3>Pondération Critère 2</h3>
                {selectedSubCriteria2.map((subCriterion) => (
                  <div key={subCriterion}>
                    <label>{subCriterion}</label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      value={weights.criterion2[subCriterion] || ""}
                      onChange={(e) =>
                        handleWeightChange(
                          "criterion2",
                          subCriterion,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isDefaultMode && allWeightsFilled && (
            <button
              className="submit-button"
              onClick={() => handleStepChange(3)}
            >
              Soumettre
            </button>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="step3">
          <div className="cards">
            <div className="cards-container criterion1-cards">
              {selectedSubCriteria1.map((subCriterion) => (
                <div className="card criterion1" key={subCriterion}>
                  <h3>{subCriterion}</h3>
                  {["s_min", "s_max", "c_min", "c_max"].map((field) => (
                    <div key={field} className="input-group">
                      <label>
                        {field.replace("_", " ")}
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={values[subCriterion]?.[field] || ""}
                          onChange={(e) =>
                            handleValueChange(
                              subCriterion,
                              field,
                              e.target.value
                            )
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="cards-container criterion2-cards">
              {selectedSubCriteria2.map((subCriterion) => (
                <div className="card criterion2" key={subCriterion}>
                  <h3>{subCriterion}</h3>
                  {["s_min", "s_max", "c_min", "c_max"].map((field) => (
                    <div key={field} className="input-group">
                      <label>
                        {field.replace("_", " ")}
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={values[subCriterion]?.[field] || ""}
                          onChange={(e) =>
                            handleValueChange(
                              subCriterion,
                              field,
                              e.target.value
                            )
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            className="submit-button"
            disabled={!isFinalStepEnabled}
            onClick={() => handleStepChange(4)} // Redirection vers l'étape 4
          >
            Terminer
          </button>
        </div>
      )}
      {/*
      {step === 4 && (
        <div className="step4">
          <div className="results-container">
            <div className="result-group group1">
              <h3>Résultats pour les sous-critères 1</h3> 
              {Object.entries(resultats1).map(([key, score]) => (
                <div
                  className="result-card"
                  key={key}
                  style={{ backgroundColor: "#ADD8E6" }}
                >
                  <h4>{key}</h4>
                  <p>
                    Score :{" "}
                    {typeof score === "number" ? score.toFixed(2) : "N/A"}
                  </p>
                </div>
              ))}
            </div>

            <div className="result-group group2">
              <h3>Résultats pour les sous-critères 2</h3>
              {Object.entries(resultats2).map(([key, score]) => (
                <div
                  className="result-card"
                  key={key}
                  style={{ backgroundColor: "#90EE90" }}
                >
                  <h4>{key}</h4>
                  <p>
                    Score :{" "}
                    {typeof score === "number" ? score.toFixed(2) : "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      */}

      {step === 4 && (
        <div className="step4">
          <h2>Résultats des critères</h2>

          {/* Formulaire pour ajouter un sous-critère à resultats1 */}
          <div>
            <h3>Ajouter un sous-critère pour Critère 1</h3>
            <input
              type="text"
              placeholder="Nom du sous-critère"
              value={newCritere}
              onChange={(e) => setNewCritere(e.target.value)}
            />
            <input
              type="number"
              placeholder="Score"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              step="0.01" // Permet des valeurs décimales
              min="0" // Valeur minimale
              max="1" // Valeur maximale
            />
            <button onClick={addCritere1}>Ajouter au Critère 1</button>
          </div>

          {/* Conteneur pour resultats1 */}
          <div className="resultats1-container">
            {Object.entries(resultats1).map(([critere, score]) => (
              <div className="critere-carre critere1" key={critere}>
                <p>{critere}</p>
                <p>Score: {score}</p>
              </div>
            ))}
          </div>

          {/* Formulaire pour ajouter un sous-critère à resultats2 */}
          <div>
            <h3>Ajouter un sous-critère pour Critère 2</h3>
            <input
              type="text"
              placeholder="Nom du sous-critère"
              value={newCritere}
              onChange={(e) => setNewCritere(e.target.value)}
            />
            <input
              type="number"
              placeholder="Score"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              step="0.01" // Permet des valeurs décimales
              min="0" // Valeur minimale
              max="1" // Valeur maximale
            />
            <button onClick={addCritere2}>Ajouter au Critère 2</button>
          </div>

          {/* Conteneur pour resultats2 */}
          <div className="resultats2-container">
            {Object.entries(resultats2).map(([critere, score]) => (
              <div className="critere-carre critere2" key={critere}>
                <p>{critere}</p>
                <p>Score: {score}</p>
              </div>
            ))}
          </div>
          {/* Bouton de soumission */}
          <button onClick={handleSubmit}>Soumettre</button>
        </div>
      )}

      {step === 5 && (
        <div>
          <div>
            <h3>Choisissez la méthode d'agrégation :</h3>
            <select
              value={aggregationMethod}
              onChange={(event) => setAggregationMethod(event.target.value)} // Utilisation directe de setAggregationMethod
            >
              <option value="">Sélectionnez une méthode</option>
              <option value="sum">Somme</option>
              <option value="average">Moyenne</option>
              <option value="max">Max</option>
            </select>
            <button
              onClick={handleSubmitAggregation}
              disabled={!aggregationMethod} // Désactiver le bouton si aucune méthode n'est sélectionnée
            >
              Appliquer
            </button>
          </div>

          {/* Afficher le graphique circulaire si les données sont disponibles */}
          {chartData ? (
            <div className="chart-container">
              <div>
                <h4>Graphique circulaire des résultats :</h4>
                <Pie data={chartData} />
              </div>
              {/* Afficher la jauge en dessous */}
              <div>
                <h4>Jauge de la Complétude :</h4>
                <GaugeChart
                  id="gauge-chart"
                  nrOfLevels={20}
                  percent={gaugeValue}
                  colors={["#FF5F6D", "#FFC371"]}
                />
              </div>
            </div>
          ) : (
            <p>Aucune donnée disponible pour le graphique.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Completeness;