from transformers import pipeline
import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


sentiment_analysis = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")


nltk.download('stopwords')#mots vides en langages different 
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('french'))  # motss vides en français

def clean_text(text):
    text = text.lower()
    
    #url
    text = re.sub(r'http\S+|www\S+|https\S+', '', text)
    
    # hashtags et mentions
    text = re.sub(r'@\w+|#\w+', '', text)
    
    # 5. Suppression des ponctuations
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    #des mots vides (stopwords)
    text = ' '.join([word for word in text.split() if word not in stop_words])
    
    # 7. Lemmatisation
    text = ' '.join([lemmatizer.lemmatize(word) for word in text.split()])
    
    #Suppression des chiffres et caractères spéciaux
    text = re.sub(r'\d+', '', text)
    
    return text
def evaluer_sentiment(stars):
    if stars in ['2 stars','4 stars','3 stars' ] : return ('neutral')
    elif stars == '5 stars' : return ('positif')
    elif stars == '1 star' : return ('negatif')

def evaluer_polarity(x,y):  #x text y:boolean
    print('we are at the analysist')
    d={}
    if y:
        
        if x=='' : 
            d['polarity_etat']='texte est vide'
            d['polarity_score']=0
            d['polarity_sentiment']='indéfinit'
            
        else:
            x=clean_text(x)
            print('text been cleaned')
            result=sentiment_analysis(x)[0]#[{....}]
            print(result)
            score=result['score']
            stars=result['label']
            if 0<=score<0.45: 
                d['polarity_etat']='Faible'
                d['polarity_score']=score
                d['polarity_sentiment']=evaluer_sentiment(stars)

            if 0.45<=score<=0.75: 
                d['polarity_etat']='Moyen'
                d['polarity_score']=score
                d['polarity_sentiment']=evaluer_sentiment(stars)
            else : 
                d['polarity_etat']='Fort'
                d['polarity_score']=score
                d['polarity_sentiment']=evaluer_sentiment(stars)
        
    else: 
        d['polarity_etat']='non selectionné'
        d['polarity_score']=0
        d['polarity_sentiment']='indéfinit'
    return d


















