import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

# Définir les variables floues
abonnés = ctrl.Antecedent(np.arange(0, 10001, 1), 'abonnés')
date_creation = ctrl.Antecedent(np.arange(0, 11, 1), 'date_creation')
postes_publies = ctrl.Antecedent(np.arange(0, 2001, 1), 'postes_publies')
frequence_publication = ctrl.Antecedent(np.arange(0, 101, 1), 'frequence_publication')

fiabilite = ctrl.Consequent(np.arange(0, 11, 1), 'fiabilite')

# Définir les fonctions d'appartenance
abonnés['faible'] = fuzz.trimf(abonnés.universe, [0, 0, 100])
abonnés['moyen'] = fuzz.trimf(abonnés.universe, [50, 500, 1000])
abonnés['élevé'] = fuzz.trimf(abonnés.universe, [500, 10000, 10000])

date_creation['ancienne'] = fuzz.trimf(date_creation.universe, [1, 10, 10])
date_creation['récente'] = fuzz.trimf(date_creation.universe, [0, 0, 1])

postes_publies['faible'] = fuzz.trimf(postes_publies.universe, [0, 0, 100])
postes_publies['moyen'] = fuzz.trimf(postes_publies.universe, [50, 500, 1000])
postes_publies['élevé'] = fuzz.trimf(postes_publies.universe, [200, 2000, 2000])

frequence_publication['faible'] = fuzz.trimf(frequence_publication.universe, [0, 0, 5])
frequence_publication['moyenne'] = fuzz.trimf(frequence_publication.universe, [5, 20, 30])
frequence_publication['élevée'] = fuzz.trimf(frequence_publication.universe, [15, 100, 100])

fiabilite['faible'] = fuzz.trimf(fiabilite.universe, [0, 0, 5])
fiabilite['moyenne'] = fuzz.trimf(fiabilite.universe, [0, 5, 10])
fiabilite['élevée'] = fuzz.trimf(fiabilite.universe, [5, 10, 10])
fiabilite['très élevée'] = fuzz.trimf(fiabilite.universe, [7, 10, 10])

# Définir les règles floues
rule1 = ctrl.Rule(abonnés['élevé'] & date_creation['récente'] & postes_publies['élevé'] & frequence_publication['élevée'], fiabilite['très élevée'])
rule2 = ctrl.Rule(abonnés['moyen'] & date_creation['ancienne'] & postes_publies['moyen'] & frequence_publication['moyenne'], fiabilite['moyenne'])
rule3 = ctrl.Rule(abonnés['faible'] | date_creation['ancienne'] | postes_publies['faible'] | frequence_publication['faible'], fiabilite['faible'])
rule4 = ctrl.Rule(abonnés['élevé'] & date_creation['récente'] & (postes_publies['moyen'] | frequence_publication['moyenne']), fiabilite['élevée'])

# Créer le système de contrôle
fiabilite_ctrl = ctrl.ControlSystem([rule1, rule2, rule3, rule4])
fiabilite_calcul = ctrl.ControlSystemSimulation(fiabilite_ctrl)

def calculer_score(abonnés_val, date_creation_val, postes_publies_val, frequence_publication_val):
    fiabilite_calcul.input['abonnés'] = abonnés_val
    fiabilite_calcul.input['date_creation'] = date_creation_val
    fiabilite_calcul.input['postes_publies'] = postes_publies_val
    fiabilite_calcul.input['frequence_publication'] = frequence_publication_val
    fiabilite_calcul.compute()
    return fiabilite_calcul.output['fiabilite']
