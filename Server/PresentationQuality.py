from flask import Flask, jsonify, request
from flask_cors import CORS

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
    
import re
def pourcentage_parentheses(phrase):
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
    # print(pourcentage)
    if(pourcentage>0.3):
      return "FAIBLE"
    elif(pourcentage>0.1):
      return "MOYEN"
    else:
      return "FORT"
    

import re
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
    
from spellchecker import SpellChecker

def french_word_exists(word):
    spell = SpellChecker(language='fr')
    if word in spell:
        return True
    else:
        return False
 

from PyDictionary import PyDictionary

def word_exists(word):
    dictionary=PyDictionary()
    meanings = dictionary.meaning(word)
    if meanings:
        return True
    else:
        return False
    

import requests

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
    
import re
def pourcentage_fautes_orthographe(text):

    mots=re.split(r'[^\w]', text)
    mots=[i.strip() for i in mots]
    fautes=[]
    for i in mots:
        langue=detect_language(i)
        print(i)
        print(langue)
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
    
from PyDictionary import PyDictionary

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


from PyDictionary import PyDictionary

def get_parts_of_speech(word):
    dictionary=PyDictionary()
    meanings = dictionary.meaning(word)
    if meanings:
        return list(meanings.keys())
    else:
        return []


import nltk
nltk.download('omw-1.4')
nltk.download('wordnet')
from nltk.corpus import wordnet as wn

def get_word_types(word):
    synsets = wn.synsets(word, lang='fra')
    types = []
    for synset in synsets:
        types.append(synset.pos())
    return list(set(types))  # remove duplicates

# Example usage:

def pourcentage_difficult_grammaticale(phrase):
    mots=phrase.split()
    n=0
    for i in mots :
      n+=len(get_word_types(i))
      n+=len(get_parts_of_speech(i))
    p=n/1000
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
    if p>0.3:
          return "FAIBLE"
    elif p>0.1:
          return "MOYEN"
    else:
          return "FORT"
    
import nltk
from nltk.corpus import wordnet

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
    
    
def hello():
    return "hello"

@app.route("/",methods=['GET'])
def users():
    user1=hello()
    return jsonify({
        "users":[
            user1,
            'mohamed',
            'ahmed',
            'mahmoud'
        ]
    })

if __name__=="__main__":
    app.run(debug=True,port=8080)