import pandas as pd




#file_path = r"C:\Users\dziri\OneDrive\Bureau\projet d'été\flask_server\tweet_data.csv"
#df = pd.read_csv(file_path)
#row
# = df.iloc[-1]

#a:debute de la montée,b : Le sommet du triangle,c : fin de la montée.
def fct_triang(x,a,b,c):
        if x<=a : return 0
        elif a<x<=b : return (x-a)/(b-a)
        elif b<x<=c : return (c-x)/(c-b)
        else : return 0
def nb_abonnes_faible(x,y):

        if x==0 :return 1
        else :return  fct_triang(x,0,0,y/3)
def nb_abonnes_moyen(x,y):
        a=y/6
        b=y/2
        c=5*y/6
        return fct_triang(x,a,b,c)
def nb_abonnes_elevé(x,y):
       a=2*y/3
       b=y
       if x<a :return 0
       elif a<=x<b : return  (x-a)/(b-a)
       else :  return  1 #x>=y
        
        
def evaluer_nb_abonnés(x,y): #x=nb abonnés y=seuil
        dic={}
        dic["Faible"]=nb_abonnes_faible(x,y)
        dic["Moyen"]=nb_abonnes_moyen(x,y)
        dic["Fort"]=nb_abonnes_elevé(x,y)
        #for i in dic.items(): print (i)
        cle_valeur_max = max(dic, key=dic.get)

        return (cle_valeur_max,dic[cle_valeur_max])#(état_flou,degres)

def evaluer_type_emetteur(x):
        if x=='individu' :return ("Faible",0.1)
        elif x=='informal group': return ("Moyen",0.4)
        elif x=='organization' : return ("Moyen",0.6)
        elif x=='organizational unit' : return ("Fort",0.99)
        else: return('faible',1)

def evaluer_profession(x):#x profession
        if x in ['Influenceurs et Célébrités','Journalistes','Politiciens','Activistes','Scientifiques et Experts','Académiciens et Professeurs','Professionnels de la Santé']: return ("Fort",0.85)
        if x in ['Entrepreneurs de la Tech','Avocats et Juristes','Consultants en Management','Travailleurs Sociaux','Ingénieurs','Artistes et Créateurs','Commerçants et Entrepreneurs Indépendants'] : return ("Moyen",0.65)
        if x  =='étudiant': return ("Faible",0.5)
        else : return('Faible',1)
        

def evaluer_profil(row,choice_row):#pour les sous criters selectionnes
        d={}
        bilan={}
        if choice_row['abonnes']:
                result=evaluer_nb_abonnés(row['nbAbonnes'],row['nbAbonnesSeuil'])
                bilan['abonnes_etat']=result[0]
                bilan['abonnes_score']=result[1]
                d[row['nbAbonnesPoids']]=result
        else:
                bilan['abonnes_etat']='Non selectionné'
                bilan['abonnes_score']=0

        if choice_row['typeEmetteurSelectionne']:
                result=evaluer_type_emetteur(row['typeEmetteur'])#(etat,score)
                bilan['type_emetteur_etat']=result[0]
                bilan['type_emetteur_score']=result[1]
                d[row['typeEmetteurPoids']]=result
        else:
               bilan['type_emetteur_etat']='Non selectionné'
               bilan['type_emetteur_score']=0 

        if choice_row['professionSelectionne']:
                result=evaluer_profession(row['profession']) 
                bilan['profession_etat']=result[0]
                bilan['profession_score']=result[1]
                d[row['professionPoids']]=result

        else:
                bilan['profession_etat']='Non selectionné'
                bilan['profession_score']=0

        if d=={} : score= ('Non selectionné',0)
        else: 
              poids_max=max(d.keys())
              score=d[poids_max]#decison de sous critere poids du profil  
        return score,bilan #valeur=(etat,score)
 


