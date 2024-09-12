from flask import Flask, request, jsonify
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate_score_final', methods=['POST'])
def calculate_score_final():
    data = request.json
    final_score=0
    # Extraire les données envoyées
    nombreAbonne = data.get('nombreAbonne', 0)
    nombreAnnee = data.get('nombreAnnee', 0)
    nombrePublication = data.get('nombrePublication', 0)
    nombreFrequence = data.get('nombreFrequence', 0)
    seuilAbonneMin = data.get('seuilAbonneMin', 0)
    seuilAbonneMax = data.get('seuilAbonneMax', 100)
    seuilAnneeMin = data.get('seuilAnneeMin', 0)
    seuilAnneeMax = data.get('seuilAnneeMax', 100)
    seuilPublicationMin = data.get('seuilPublicationMin', 0)
    seuilPublicationMax = data.get('seuilPublicationMax', 100)
    seuilFrequenceMin = data.get('seuilFrequenceMin', 0)
    seuilFrequenceMax = data.get('seuilFrequenceMax', 100)
    poidsAbonne = data.get('poidsAbonne', 0)
    poidsAnnee = data.get('poidsAnnee', 0)
    poidsPublication = data.get('poidsPublication', 0)
    poidsFrequence = data.get('poidsFrequence', 0)
    disableAbonne = data.get('disableAbonne', False)
    disableAnnee = data.get('disableAnnee', False)
    disablePublication = data.get('disablePublication', False)
    disableFrequence = data.get('disableFrequence', False)
    aggregationMethod = data.get('aggregationMethod', 'moyenne')

    # Définition des variables floues avec les nouvelles valeurs
    nombre = ctrl.Antecedent(np.arange(0, 1000000001, 1000), 'nombre')
    date_creation = ctrl.Antecedent(np.arange(0, 21, 1), 'date_creation')
    publication = ctrl.Antecedent(np.arange(0, 10001, 1), 'publication')
    frequence = ctrl.Antecedent(np.arange(0, 101, 1), 'frequence')
    score = ctrl.Consequent(np.arange(0, 101, 1), 'score')
    
    # Définition des fonctions d'appartenance
    nombre['low'] = fuzz.trimf(nombre.universe, [0, 0, 50000])
    nombre['medium'] = fuzz.trimf(nombre.universe, [0, 50000, 1000000000])
    nombre['high'] = fuzz.trimf(nombre.universe, [50000, 1000000000, 1000000000])
    
    date_creation['young'] = fuzz.trimf(date_creation.universe, [0, 0, 5])
    date_creation['medium'] = fuzz.trimf(date_creation.universe, [0, 5, 15])
    date_creation['old'] = fuzz.trimf(date_creation.universe, [5, 15, 20])
    
    publication['low'] = fuzz.trimf(publication.universe, [0, 0, 1000])
    publication['medium'] = fuzz.trimf(publication.universe, [0, 1000, 10000])
    publication['high'] = fuzz.trimf(publication.universe, [1000, 10000, 10000])
    
    frequence['low'] = fuzz.trimf(frequence.universe, [0, 0, 25])
    frequence['medium'] = fuzz.trimf(frequence.universe, [0, 25, 50])
    frequence['high'] = fuzz.trimf(frequence.universe, [25, 50, 100])
    
    score['low'] = fuzz.trimf(score.universe, [0, 0, 50])
    score['medium'] = fuzz.trimf(score.universe, [0, 50, 100])
    score['high'] = fuzz.trimf(score.universe, [50, 100, 100])
    
    # Définition des règles
    rules = []
    if not disableAbonne and poidsAbonne > 0:
        rules.append(ctrl.Rule(nombre['medium'], score['medium']))
    if not disableAnnee and poidsAnnee > 0:
        rules.append(ctrl.Rule(date_creation['medium'], score['medium']))
    if not disablePublication and poidsPublication > 0:
        rules.append(ctrl.Rule(publication['medium'], score['medium']))
    if not disableFrequence and poidsFrequence > 0:
        rules.append(ctrl.Rule(frequence['medium'], score['high']))
    
    # Création des systèmes de contrôle flou pour chaque critère
    systems = {
        'nombre': ctrl.ControlSystem([rules[0]]) if not disableAbonne and poidsAbonne > 0 else None,
        'date_creation': ctrl.ControlSystem([rules[1]]) if not disableAnnee and poidsAnnee > 0 else None,
        'publication': ctrl.ControlSystem([rules[2]]) if not disablePublication and poidsPublication > 0 else None,
        'frequence': ctrl.ControlSystem([rules[3]]) if not disableFrequence and poidsFrequence > 0 else None
    }
    
    # Calcul des scores pour chaque critère
    scores = []
    for criterion, system in systems.items():
        if system:
            simulation = ctrl.ControlSystemSimulation(system)
            simulation.input[criterion] = {
                'nombre': nombreAbonne,
                'date_creation': nombreAnnee,
                'publication': nombrePublication,
                'frequence': nombreFrequence
            }[criterion]
            simulation.compute()
            scores.append(simulation.output['score'])
    
    # Agrégation des scores en fonction de la méthode choisie
    if aggregationMethod == 'moyenne':
        final_score = np.mean(scores) if scores else 0
    elif aggregationMethod == 'max':
        final_score = np.max(scores) if scores else 0
    elif aggregationMethod == 'combinaison':
        weighted_scores = [
            (poidsAbonne * scores[0] if not disableAbonne and poidsAbonne > 0 else 0),
            (poidsAnnee * scores[1] if not disableAnnee and poidsAnnee > 0 else 0),
            (poidsPublication * scores[2] if not disablePublication and poidsPublication > 0 else 0),
            (poidsFrequence * scores[3] if not disableFrequence and poidsFrequence > 0 else 0)
        ]
        total_weights = sum([
            poidsAbonne if not disableAbonne and poidsAbonne > 0 else 0,
            poidsAnnee if not disableAnnee and poidsAnnee > 0 else 0,
            poidsPublication if not disablePublication and poidsPublication > 0 else 0,
            poidsFrequence if not disableFrequence and poidsFrequence > 0 else 0
        ])
        final_score = np.sum(weighted_scores) / total_weights if total_weights > 0 else 0

    # Renvoyer le score calculé
    return jsonify({"final_score": final_score})

if __name__ == '__main__':
    app.run(debug=True)
