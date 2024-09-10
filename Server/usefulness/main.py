from flask import Flask, request, jsonify
from poids_du_profil import evaluer_profil
from tweet_engagement import evaluer_engagement
from tweet_polarity import evaluer_polarity



app = Flask(__name__)


@app.route("/api/evaluate_tweet",methods=['POST', 'GET'])#endpoint
def evaluate_tweet():
    print('we are in flask')
    
    data = request.get_json()
    if data is None:
        return jsonify({'error': 'No data provided'}), 400
    tweetdata = data.get('tweetData')
    criteres_selectionnes = data.get('criteresSelectionnes')
    parametres = data.get('parametres')
    poids=data.get('poids')
    criteresAjoutes=data.get('criteresAjoutes')
    print(poids)
   
    row={**tweetdata,**parametres,**poids}
    for i in row: 
        if i not in ['tweetText','typeEmetteur','profession', 'tweetPolarity']:
            row[i]=float(row[i])
   
    print(row)
#(niveau,score)
    profil_results=evaluer_profil(row,criteres_selectionnes)
    polarity_results=evaluer_polarity(tweetdata['tweetText'],criteres_selectionnes['tweetPolarity'])
    engagement_results=evaluer_engagement(row,criteres_selectionnes)
    print(profil_results)
    print(polarity_results)
    print(engagement_results)



    

    results_dict = {**polarity_results, **profil_results[1], **engagement_results[1]}
   
    
    criteres_results={
        'poidsDuProfil_etat':profil_results[0][0],'poidsDuProfil_score':profil_results[0][1],
        'engagement_etat':engagement_results[0][0],'engagement_score':engagement_results[0][1]
        #polarite deja fait
    }
    results_dict.update(criteres_results)

 ##uselfulness_score
    score={}
    for newcritere in criteresAjoutes:#newcritere={}
       score[0]=(newcritere['critereValue'],newcritere['critereEtat'])#ajouter les nouveaux criteres
    
    if criteres_selectionnes['poidsDuProfil']:
        score[float(poids['poidsDuProfil'])]=profil_results[0]
    if criteres_selectionnes['tweetPolarity']:
        score[float(poids['tweetPolarityPoids'])]=(polarity_results['polarity_etat'],polarity_results['polarity_score'])
    if criteres_selectionnes['tweetEngagement']:
        score[float(poids['tweetEngagement'])]=engagement_results[0]
    if score=={}:
        results_dict['usefulness_etat']='indefini'
        results_dict['usefulness_score']=0
    else:
        poids_max=max(score.keys())
        results_dict['usefulness_etat']=score[poids_max][0]
        results_dict['usefulness_score']=score[poids_max][1]
    
    print('SCORE/////')
    print(score)
   
    print('resul dictt/////')
    print(results_dict)
   
    return  jsonify(results_dict )



if __name__ == '__main__':
    app.run(debug=True)
