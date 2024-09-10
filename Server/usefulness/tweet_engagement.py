

#fct triangulaire a:debute de la montée,b : Le sommet du triangle,c : fin de la montée.


def etat_faible(x,y):
        b=0
        c=y/3
        if x==0 :return 1
        elif b<x<=c : return (c-x)/(c-b)
        else : return 0
def etat_moyen(x,y):
        a=y/6
        b=y/2
        c=5*y/6
        if x<=a or x>c : return 0
        elif a<x<=b : return (x-a)/(b-a)
        elif b<x<=c : return (c-x)/(c-b)
       
def etat_elevé(x,y):
       a=2*y/3
       b=y
       if x<a :return 0
       elif a<=x<b : return  (x-a)/(b-a)
       else :  return  1 #x>=y
def evaluer_likes(x,y): #x=nb likes , y=seuil
        dd={}
        dd["Faible"]=etat_faible(x,y)
        dd["Moyen"]=etat_moyen(x,y)
        dd["Fort"]=etat_elevé(x,y)
        #for i in dd.items(): print (i)
        cle_valeur_max = max(dd, key=dd.get)

        return (cle_valeur_max,dd[cle_valeur_max])
def evaluer_retweets(x,y):
        dd={}
        dd["Faible"]=etat_faible(x,y)
        dd["Moyen"]=etat_moyen(x,y)
        dd["Fort"]=etat_elevé(x,y)
        #for i in dd.items(): print (i)
        cle_valeur_max = max(dd, key=dd.get)

        return (cle_valeur_max,dd[cle_valeur_max])
def evaluer_replies(x,y):
        dic={}
        dic["Faible"]=etat_faible(x,y)
        dic["Moyen"]=etat_moyen(x,y)
        dic["Fort"]=etat_elevé(x,y)
        #for i in dic.items(): print (i)
        cle_valeur_max = max(dic, key=dic.get)

        return (cle_valeur_max,dic[cle_valeur_max]) 

bilan={'likes_etat':'Non selectionné','likes_score':0 , 'replies_etat':'Non selectionné', 'replies_score':0 ,  'retweets_etat':'Non selectionné', 'retweets_score':0 }

def evaluer_engagement(row,choice_row):
     if choice_row['methode2']:
       
        score_engagement=(row['likes']+
                        row['retweetsPoids']+
                        row['repliesPoids'])/row['views']
        if 0<=score_engagement<0.45 : return (('Faible',score_engagement),bilan)
        if 0.45<=score_engagement<0.8 :return (('Moyen',score_engagement),bilan)
        else : return (('Fort',score_engagement),bilan)
       
     if choice_row['methode1'] :
        d={}
        
        if choice_row['likes']:
                result=evaluer_likes(row['likes'],row['likesSeuil'])
                bilan['likes_etat']=result[0]
                bilan['likes_score']=result[1]
                d[row['likesPoids']]=result

        if choice_row['replies']:
                result=evaluer_replies(row['replies'],row['repliesSeuil'])
                bilan['replies_etat']=result[0]
                bilan['replies_score']=result[1]
                d[row['repliesPoids']]=result
        
              

        if choice_row['retweets']:
                result=evaluer_retweets(row['retweets'],row['retweetsSeuil'])
                bilan['retweets_etat']=result[0]
                bilan['retweets_score']=result[1]
                d[row['retweetsPoids']]=result
        
        if d=={}: return ('les facteurs non selectionnés',0),bilan
        else:
          poids_max=max(d.keys())
          if (row['views']==0 ):return ('Faible',1),bilan
          else :
                return ((d[poids_max][0],d[poids_max][1]),bilan)
   
          #valeur de deux dic =(etat,score)
     else: return(('méthode non sélectionnée',0),bilan)
        

        




       
       


