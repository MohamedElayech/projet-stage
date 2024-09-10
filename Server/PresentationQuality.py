from flask import Flask, jsonify, request
from flask_cors import CORS
import re
from spellchecker import SpellChecker
from PyDictionary import PyDictionary
import requests
import nltk
from nltk.corpus import wordnet
nltk.download('omw-1.4')
nltk.download('wordnet')
from nltk.corpus import wordnet as wn


app = Flask(__name__)
cors=CORS(app, origins='*')

def pourcentage_mots_uniques(texte):
    mots = texte.split()
    mots_uniques = set(mots)
    pourcentage = (len(mots_uniques) / len(mots))
    if(pourcentage>0.7):
      return "FAIBLE"
    elif(pourcentage>0.4):
      return "MOYEN"
    else:
      return "FORT"

def pourcentage_mots_phrase(texte):
    nbr_mot_par_phrase = []
    phrases = texte.split('.')
    for phrase in phrases:
        mots = phrase.split()
        nbr_mot_par_phrase.append(len(mots))

    nbr_mots = sum(nbr_mot_par_phrase) / len(nbr_mot_par_phrase)
    # print(nbr_mots)
    phrases = texte.split('.')
    pourcentage = (nbr_mots / len(phrases))
    if(pourcentage>30):
      return "FAIBLE"
    elif(pourcentage>15):
      return "MOYEN"
    else:
      return "FORT"
    

def pourcentage_parentheses_phrase(phrase):
    parentheses = ['(', ')']
    mots=re.split(r'[\. ]', phrase)
    # print(mots)
    l=len(mots)
    l+=1
    nbr_parentheses = 0
    for mot in mots:
        if '(' in mot or ')' in mot:
          l-=1
          for i in mot:
            if i in parentheses:
              # print(i)
              nbr_parentheses += 1
              l+=1

    pourcentage = (nbr_parentheses / l)
    return pourcentage

def pourcentage_parentheses(text):
    phrases=text.split('.')
    p=0
    for phrase in phrases:
       p+=pourcentage_parentheses_phrase(phrase)

    p/=len(phrases)
    # print(pourcentage)
    if(p>0.3):
      return "FAIBLE"
    elif(p>0.1):
      return "MOYEN"
    else:
      return "FORT"
 


def est_abreviation(word):
    if(word.isupper()):
        return 1
    else:
        return 0

def pourcentatge_abreviation(text):
    words=re.split(r'[\. ]', text)
    n=0
    for i in words:
        if(est_abreviation(i)):
            n+=1
    pourcentage=(n/len(words))
    if(pourcentage>0.4):
      return "FAIBLE"
    elif(pourcentage>0.2):
      return "MOYEN"
    else:
      return "FORT"
    


def french_word_exists(word):
    spell = SpellChecker(language='fr')
    if word in spell:
        return True
    else:
        return False
 



def word_exists(word):
    dictionary=PyDictionary()
    meanings = dictionary.meaning(word)
    if meanings:
        return True
    else:
        return False
    



# Load a list of common French and English words
french_words = requests.get("https://raw.githubusercontent.com/dwyl/english-words/master/french.txt").text.splitlines()
english_words = requests.get("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt").text.splitlines()

def detect_language(word):
    """
    Detect the language of a given word.

    Args:
        word (str): The word to detect the language for.

    Returns:
        str: The detected language ("French" or "English").
    """
    word = word.lower()

    if word in french_words:
        return "French"
    elif word in english_words:
        return "English"
    else:
        return "Unknown"
    

def pourcentage_fautes_orthographe(text):

    mots=re.split(r'[^\w]', text)
    mots=[i.strip() for i in mots]
    fautes=[]
    for i in mots:
        langue=detect_language(i)
        # print(i)
        # print(langue)
        if langue=="French":
            if french_word_exists(i)==False:
                fautes.append(i)
        elif langue=="English":
            if word_exists(i)==False:
                fautes.append(i)
        else:
            fautes.append(i)


    p= len(fautes)/len(mots)
    if p>0.4:
      return "FAIBLE"
    elif p>0.05:
      return "MOYEN"
    else:
      return "FORT"
    

def pourcentage_cross_reference_sentence(phrase):
    words=phrase.split()
    n=0
    for i in words:
        if i.lower() in ["you","she","he","they","it","we"] or i.lower() in ["tu", "elle", "il", "ils", "elles", "on"]:
          n+=1
    return n/len(words)


def pourcentage_cross_reference(text):
    phrases=text.split(".")
    n=0.
    for phrase in phrases:
        n+=pourcentage_cross_reference_sentence(phrase)
    p =  n/len(phrases)
    if p>0.5:
      return "FAIBLE"
    elif p>0.2:
      return "MOYEN"
    else:
      return "FORT"
    


def get_word_meaning(word):
    dictionary=PyDictionary()
    meanings = dictionary.meaning(word)
    print(meanings.items().values())
    if meanings:
        for key, value in meanings.items():
            print(f"{word} ({key}):")
            for definition in value:
                print(f"- {definition}")

    else:
        print(f"Sorry, couldn't find the meaning of {word}.")




def get_parts_of_speech(word):
    dictionary=PyDictionary()
    meanings = dictionary.meaning(word)
    if meanings:
        return list(meanings.keys())
    else:
        return []




def get_word_types(word):
    synsets = wn.synsets(word, lang='fra')
    types = []
    for synset in synsets:
        types.append(synset.pos())
    return list(set(types))  # remove duplicates

# Example usage:

def pourcentage_difficult_grammaticale_phrase(phrase):
    mots=phrase.split()
    n=0
    for i in mots :
      n+=len(get_word_types(i))
      n+=len(get_parts_of_speech(i))
    p=n/1000
    return p
def pourcentage_difficult_grammaticale(text):
    phrases=text.split('.')
    p=0
    for phrase in phrases:
       p+=pourcentage_difficult_grammaticale_phrase(phrase)
    p/=len(phrases)   
    if p>0.5:
      return "FAIBLE"
    elif p>0.2:
      return "MOYEN"
    else:
      return "FORT"


def nbr_signification_mot(word):
    dictionary=PyDictionary()
    meanings = dictionary.meaning(word)
    liste=[]

    if meanings:
        for i in meanings.items():
          liste.append(len(i[1]))
        # print(sum(liste))
        return sum(liste)
    else:
        return 0
    
import re
def nbr_signification_mots_phrase(phrase):
    mots=re.split(r'[^\w]', phrase)
    print(mots)
    n=0
    for i in mots:
      n+=nbr_signification_mot(i)

    p =  n/1000
    return p
    
    
def pourcentage_polysemie(text):
    phrases=text.split('.')
    p=0
    for phrase in phrases:
        p+=nbr_signification_mots_phrase(phrase)
    p/=len(phrases)
    if p>0.3:
          return "FAIBLE"
    elif p>0.1:
          return "MOYEN"
    else:
          return "FORT"
    


def get_synonyms(word):
    """
    Get synonyms for an English word.

    Args:
        word (str): The input word.

    Returns:
        list: A list of synonyms for the input word.
    """
    synonyms = []
    for synset in wordnet.synsets(word):
        for lemma in synset.lemmas():
            synonyms.append(lemma.name())
    return set(synonyms)


def pourcentage_synonymes(text):
    mots=re.split(r'[^\w]', text)
    mots=[i.strip() for i in mots]
    n=0
    s=set()
    for i in mots:
        if i in s:
            n+=1
        s.update(get_synonyms(i))
    p = n/1000
    if p>0.3:
      return "FAIBLE"
    elif p>0.05:
      return "MOYEN"
    else:
      return "FORT"
    

#Implementation de la fonction qui verifie si le texte contient des emojis ou non

import re

def contains_emoji(text):
    """
    Returns True if the text contains at least one emoji, False otherwise.
    """
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"  # emoticons
        "\U0001F300-\U0001F5FF"  # symbols & pictographs
        "\U0001F680-\U0001F6FF"  # transport & map symbols
        "\U0001F1E0-\U0001F1FF"  # flags (iOS)
        "\U00002500-\U00002587"  # chinese char
        "\U00002589-\U0001F251"  # I need Unicode Character "█" (U+2588)
        "]+",
        flags=re.UNICODE
    )
    if bool(emoji_pattern.search(text))==True:
       return "FORT"
    else:
       return "FAIBLE"



def presence_hashtags(text):
    if "#" in text:
       return "FORT"
    else : 
       return "FAIBLE"


def position_hashtag(text):
    n=text.count("#")
    a=0
    words=words = re.findall(r"#\w+|\w+", text)
    l=len(words)
    for i in range(l-1,0,-1):
        if "#" in words[i]:
            a+=1
        else:
            break
    if a==n:
        return "FORT"
    else:
        return "FAIBLE"



     
def hello():
    return "hello"


text="They chose #Amiens. And they will be well there! 🧑‍🎓 You crossed paths with them, 'colorful' today, you will cross paths with them every day tomorrow. Welcome and happy new school year to the more than 30,000 Amiens students! We are so happy to welcome you! 🫶 #JAE2023"
image="https://pbs.twimg.com/media/F6AJ3HmWEAAzt7i?format=jpg&name=large"

@app.route("/",methods=['GET'])
def user():
    
    pourcentagemotsuniques=pourcentage_mots_uniques(text)
    pourcentagemotsphrase=pourcentage_mots_phrase(text)
    pourcentageparentheses=pourcentage_parentheses(text)
    pourcentatgeabreviation=pourcentatge_abreviation(text)
    pourcentagefautesorthographe=pourcentage_fautes_orthographe(text)
    pourcentagecrossreference=pourcentage_cross_reference(text)
    pourcentagedifficultgrammaticale=pourcentage_difficult_grammaticale(text)
    pourcentagesynonymes=pourcentage_synonymes(text)
    pourcentagepolysemie=pourcentage_polysemie(text)
    presencehashtags=presence_hashtags(text)
    positionhashtag=position_hashtag(text)
    emojis=contains_emoji(text)
    return jsonify({
       'pourcentagemotsuniques': pourcentagemotsuniques,
       'pourcentagemotsphrase' : pourcentagemotsphrase,
       'pourcentageparentheses' : pourcentageparentheses,
       'pourcentatgeabreviation' : pourcentatgeabreviation,
       'pourcentagefautesorthographe' : pourcentagefautesorthographe,
       'pourcentagecrossreference' : pourcentagecrossreference,
       'pourcentagedifficultgrammaticale' : pourcentagedifficultgrammaticale,
       'pourcentagesynonymes' : pourcentagesynonymes,
       'pourcentagepolysemie' : pourcentagepolysemie,
       'emojis' : emojis,
       'presencehashtags' : presencehashtags,
       'positionhashtag' : positionhashtag
                    
                    })
      

if __name__=="__main__":
    app.run(debug=True,port=8080)


# Set-ExecutionPolicy RemoteSigned -Scope Process