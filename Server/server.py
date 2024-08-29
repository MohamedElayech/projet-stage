from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

app = Flask(__name__)
CORS(app, resources={
    r"/calculate_score_final": {
        "origins": "http://localhost:3000",
        "methods": ["GET", "POST"],
        "headers": ["Content-Type"]
    }
})

@app.route('/calculate_score_final', methods=['POST'])
def calculate_score_final():
    data = request.json

    # Extract data from request, with defaults for missing values
    verified = data.get('verified', False)
    selected = int(data.get('selected', 0))
    nombre_abonne = int(data.get('nombreAbonne', 0))
    nombre_annee = int(data.get('nombreAnnee', 0))
    nombre_publication = int(data.get('nombrePublication', 0))
    nombre_frequence = int(data.get('nombreFrequence', 0))
    seuil_abonne = int(data.get('seuilAbonne', 0))
    seuil_annee = int(data.get('seuilAnnee', 0))
    seuil_publication = int(data.get('seuilPublication', 0))
    seuil_frequence = int(data.get('seuilFrequence', 0))
    poids_abonne = float(data.get('poidsAbonne', 0))
    poids_annee = float(data.get('poidsAnnee', 0))
    poids_publication = float(data.get('poidsPublication', 0))
    poids_frequence = float(data.get('poidsFrequence', 0))
    disable_abonne = data.get('disableAbonne', False)
    disable_annee = data.get('disableAnnee', False)
    disable_publication = data.get('disablePublication', False)
    disable_frequence = data.get('disableFrequence', False)

    # Initialize fuzzy variables
    nombre = ctrl.Antecedent(np.arange(0, 1000000001, 1000), 'nombre')
    date_creation = ctrl.Antecedent(np.arange(0, 21, 1), 'date_creation')
    publication = ctrl.Antecedent(np.arange(0, 10001, 1), 'publication')
    frequence = ctrl.Antecedent(np.arange(0, 101, 1), 'frequence')
    score = ctrl.Consequent(np.arange(0, 101, 1), 'score')

    # Define fuzzy membership functions for number of followers based on account type
    if selected == 1:  # Individual
        nombre['low'] = fuzz.trimf(nombre.universe, [0, 0, 5000])
        nombre['medium'] = fuzz.trimf(nombre.universe, [0, 5000, 500000])
        nombre['high'] = fuzz.trimf(nombre.universe, [5000, 50000, 100000000])
    else:  # Business or Organization
        nombre['low'] = fuzz.trimf(nombre.universe, [0, 0, 500000])
        nombre['medium'] = fuzz.trimf(nombre.universe, [0, 500000, 5000000])
        nombre['high'] = fuzz.trimf(nombre.universe, [500000, 5000000, 1000000000])

    date_creation['recent'] = fuzz.trimf(date_creation.universe, [0, 0, 1])
    date_creation['medium'] = fuzz.trimf(date_creation.universe, [0, 1, 10])
    date_creation['old'] = fuzz.trimf(date_creation.universe, [1, 10, 20])
    
    publication['low'] = fuzz.trimf(publication.universe, [0, 0, 100])
    publication['medium'] = fuzz.trimf(publication.universe, [0, 100, 500])
    publication['high'] = fuzz.trimf(publication.universe, [100, 500, 1000])
    
    frequence['low'] = fuzz.trimf(frequence.universe, [0, 0, 10])
    frequence['medium'] = fuzz.trimf(frequence.universe, [0, 10, 30])
    frequence['high'] = fuzz.trimf(frequence.universe, [10, 30, 100])
    
    score['low'] = fuzz.trimf(score.universe, [0, 0, 30])
    score['medium'] = fuzz.trimf(score.universe, [0, 30, 70])
    score['high'] = fuzz.trimf(score.universe, [30, 70, 100])

    # Define fuzzy rules
    rules = []

    # Rules for nombre d'abonne
    if not disable_abonne:
        rules.append(ctrl.Rule(nombre['high'] & (poids_abonne > 0), score['high']))
        rules.append(ctrl.Rule(nombre['medium'] & (poids_abonne > 0), score['medium']))
        rules.append(ctrl.Rule(nombre['low'] & (poids_abonne > 0), score['low']))

    # Rules for date de creation du compte
    if not disable_annee:
        rules.append(ctrl.Rule(date_creation['recent'] & (poids_annee > 0), score['high']))
        rules.append(ctrl.Rule(date_creation['medium'] & (poids_annee > 0), score['medium']))
        rules.append(ctrl.Rule(date_creation['old'] & (poids_annee > 0), score['low']))

    # Rules for nombre de publications
    if not disable_publication:
        rules.append(ctrl.Rule(publication['high'] & (poids_publication > 0), score['high']))
        rules.append(ctrl.Rule(publication['medium'] & (poids_publication > 0), score['medium']))
        rules.append(ctrl.Rule(publication['low'] & (poids_publication > 0), score['low']))

    # Rules for frequence de publication
    if not disable_frequence:
        rules.append(ctrl.Rule(frequence['high'] & (poids_frequence > 0), score['high']))
        rules.append(ctrl.Rule(frequence['medium'] & (poids_frequence > 0), score['medium']))
        rules.append(ctrl.Rule(frequence['low'] & (poids_frequence > 0), score['low']))

    # Create and simulate fuzzy system
    score_ctrl = ctrl.ControlSystem(rules)
    score_simulation = ctrl.ControlSystemSimulation(score_ctrl)

    # Pass input data to the simulation
    score_simulation.input['nombre'] = nombre_abonne
    score_simulation.input['date_creation'] = nombre_annee
    score_simulation.input['publication'] = nombre_publication
    score_simulation.input['frequence'] = nombre_frequence

    score_simulation.compute()
    final_score = score_simulation.output['score']

    return jsonify({'final_score': final_score})

if __name__ == '__main__':
    app.run(debug=True)
