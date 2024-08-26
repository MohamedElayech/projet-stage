from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permet les requêtes CORS

@app.route('/calculer_score', methods=['POST'])
def calculer_score_endpoint():
    data = request.json
    abonnés_val = data.get('abonnés')
    date_creation_val = data.get('date_creation')
    postes_publies_val = data.get('postes_publies')
    frequence_publication_val = data.get('frequence_publication')
    
    score = calculer_score(abonnés_val, date_creation_val, postes_publies_val, frequence_publication_val)
    
    return jsonify({'score': score})

if __name__ == '__main__':
    app.run(debug=True)
