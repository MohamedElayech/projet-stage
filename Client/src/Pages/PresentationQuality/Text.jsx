// import { handle } from "express/lib/application"n
import InputPoid from "./InputPoid"
import { useState, useEffect } from "react"
import axios from 'axios'
import "./text.css"

export default function Text(){
    // const [count,setCount] =  useState(0)
    // const handlePoidChange = (newPoid) => {
    //     setCount(newPoid); // Update count state based on the new poid
    //   };
    
    // const textData = {
    //     "qualite_texte" : [0,'failbe'],
    //     "presence_texte":[0,'faible'],
    //     "emojis":[0,'faible'],
    //     "sytaxique":[0,'faible'],
    //     "semantique":[0,'faible'],
    //     "mots_unique":[0,'faible'],
    //     "mots_phrase":[0,'faible'],
    //     "abreviations":[0,'faible'],
    //     "parentheses":[0,'faible'],
    //     "fautes_orthographe":[0,'faible'],
    //     "crossreference":[0,'faible'],
    //     "difficulte_grammaticale":[0,'faible'],
    //     "polysemie":[0,'faible'],
    //     "synonymes":[0,'faible'],
    //     "hashtags":[0,'faible'],
    //     "presnace_#":[0,'faible'],
    //     "position_#":[0,'faible'],

    // }


    const [texte,setTexte]=useState([{value:'',poid : ''}])
    const [qualite_texte,setQualiteTexte]=useState([{ value: '', poid: '' }])
    const [presencetexte,setPresenceTexte]=useState([{ value: '', poid: '' }])
    const [emojies,setEmojis]=useState([{ value: '', poid: '' }])
    const [syntaxique,setSyntaxique]=useState([{ value: '', poid: '' }])
    const [semantique,setSemantique]=useState([{ value: '', poid: '' }])
    const [motUnique,setMotUnique]=useState([{ value: '', poid: '' }])
    const [motsPhrase,setMotsPhrase]=useState([{ value: '', poid: '' }])
    const [abreviations,setAbreviations]=useState([{ value: '', poid: '' }])
    const [parentheses,setParenthese]=useState([{ value: '', poid: '' }])
    const [fautesOrthographe,setFautesOrthographe]=useState([{ value: '', poid: '' }])
    const [crossreference,setCrossreference]=useState([{ value: '', poid: '' }])
    const [diffuculteGrammaticale,setDiffuculteGrammaticale]=useState([{ value: '', poid: '' }])
    const [polysemie,setPolysemie]=useState([{ value: '', poid: '' }])
    const [synonymes,setSynonymes]=useState([{ value: '', poid: '' }])
    const [hashtags,setHashtags]=useState([{ value: '', poid: '' }])
    const [presenseHashtag,setPresenseHashtag]=useState([{ value: '', poid: '' }])
    const [positionHashtag,setPdositionHashtag]=useState([{ value: '', poid: '' }])
    const [textData,setTextData]=useState(null)    

    

    const handleQualitePoidChange = (event) => {
        const poidValue =  event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setQualiteTexte([{ value: qualite_texte[0].value, poid: poidValue }]);
        
      };
      
      const handlePresencePoidChange = (event) => {
        const poidValue = event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setPresenceTexte([{ value: presencetexte[0].value, poid: poidValue }]);
      };
      
      const handleEmojisPoidChange = (event) => {
        const poidValue = event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setEmojis([{ value: emojies[0].value, poid: poidValue }]);
      };
      
      const handleSyntaxiquePoidChange = (event) => {
        const poidValue = event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setSyntaxique([{ value: syntaxique[0].value, poid: poidValue }]);
      };
      
      const handleSemantiquePoidChange = (event) => {
        const poidValue = event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setSemantique([{ value: semantique[0].value, poid: poidValue}]);
      };
      
      const handleMotUniquePoidChange = (event) => {
        const poidValue = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setMotUnique([{ value: motUnique[0].value, poid: poidValue }]);
        // setMotUnique([])
      };
      
      const handleMotsPhrasePoidChange = (event) => {
        const poidValue = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setMotsPhrase([{ value: motsPhrase[0].value, poid: poidValue }]);
      };
      
      const handleAbreviationsPoidChange = (event) => {
        const poidValue = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setAbreviations([{ value: abreviations[0].value, poid: poidValue}]);
      };
      
      const handleParenthesesPoidChange = (event) => {
        const poidValue = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setParenthese([{ value: parentheses[0].value, poid: poidValue }]);
      };
      
      const handleFautesOrthographePoidChange = (event) => {
        const poidValue = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setFautesOrthographe([{ value: fautesOrthographe[0].value, poid: poidValue }]);
      };
      
      const handleCrossreferencePoidChange = (event) => {
        const poidValue = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setCrossreference([{ value: crossreference[0].value, poid: poidValue}]);
      };
      
      const handleDiffuculteGrammaticalePoidChange = (event) => {
        const poidValue = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setDiffuculteGrammaticale([{ value: diffuculteGrammaticale[0].value, poid: poidValue }]);
      };
      
      const handlePolysemiePoidChange = (event) => {
        const poidValue = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setPolysemie([{ value: polysemie[0].value, poid: poidValue}]);
      };
      
      const handleSynonymesPoidChange = (event) => {
        const poidValue = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setSynonymes([{ value: synonymes[0].value, poid: poidValue }]);
      };
      
      const handleHeshtagsPoidChange = (event) => {
        const poidValue = event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setHashtags([{ value: hashtags[0].value, poid: poidValue }]);
      };
      
      const handlePresenseHashtagPoidChange = (event) => {
        const poidValue = event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setPresenseHashtag([{ value: presenseHashtag[0].value, poid: poidValue }]);
      };
      
      const handlePositionHashtagPoidChange = (event) => {
        const poidValue = event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setPdositionHashtag([{ value: positionHashtag[0].value, poid: poidValue }]);
      };
      const handleTextChange = (event) =>{
        const poidValue = document.getElementById('textt').checked ? event.target.value : 0;
        setTexte([{ value: texte[0].value, poid: poidValue }]);
      }
      // useEffect(() => {
      //   async function fetchData() {
      //     try {
      //       const response = await axios.get('http://localhost:8080/');
      //       setTextData(response.data);
      //     } catch (error) {
      //       console.error(error);
      //     }
      //   }
      //   fetchData();
      // }, []);
      
      const chosefunction = async  (event) => {
        event.preventDefault();
    
        let syntax=''
        let maxsynt=Math.max(parseFloat(motsPhrase[0].poid),parseFloat(motUnique[0].poid),parseFloat(parentheses[0].poid),parseFloat(fautesOrthographe[0].poid),parseFloat(abreviations[0].poid))
        switch(maxsynt){
          case parseFloat(motsPhrase[0].poid):
            syntax='motsPhrase'
            break
          case parseFloat(motUnique[0].poid):
            syntax='motsunique'
            break
          case parseFloat(parentheses[0].poid):
            syntax='parentheses'
            break
          case parseFloat(fautesOrthographe[0].poid):
            syntax='fautesorthographe'
            break
          case parseFloat(abreviations[0].poid):
            syntax='abreviations'
        }
        let semant=''
    
        let maxsyme = Math.max(parseFloat(synonymes[0].poid), parseFloat(polysemie[0].poid), parseFloat(diffuculteGrammaticale[0].poid), parseFloat(crossreference[0].poid));
        

        switch (maxsyme) {
          case parseFloat(synonymes[0].poid):
            semant = 'synonymes';
            break;
          case parseFloat(polysemie[0].poid):
            semant = 'polysemie';
            break;
          case parseFloat(diffuculteGrammaticale[0].poid):
            semant = 'diffuculteGrammaticale';
            break;
          case parseFloat(crossreference[0].poid):
            semant = 'crossreference';
            break;
        }
       
        let textQuality=''
        
        if(syntaxique[0].poid>semantique[0].poid){
          textQuality=syntax
        }else{
          textQuality=semant
        }
        let hashtag=''
        if(presenseHashtag[0].poid > positionHashtag[0].poid ){
          hashtag='presneceHashtag'
        }else{
          hashtag='positionHashtag'
        }
        let emoji='emojies'
        let presence='presnecetext'
        
       
        let maxtext = Math.max(parseFloat(hashtags[0].poid), parseFloat(qualite_texte[0].poid), parseFloat(emojies[0].poid), parseFloat(presencetexte[0].poid));
        let textcri = '';

        switch (maxtext) {
          case parseFloat(hashtags[0].poid):
            textcri = hashtag;
            break;
          case parseFloat(qualite_texte[0].poid):
            textcri = textQuality;
            break;
          case parseFloat(emojies[0].poid):
            textcri = emoji;
            break;
          case parseFloat(presencetexte[0].poid):
            textcri = presence;
            break;
        }
        const response = await fetch('http://localhost:8080', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ textcri }),
        });

        console.log(textcri)
      }
    
      // useEffect(() => {
      //   if (textData) {
      //     setPresenceTexte([{ value: textData.presencetext, poid: qualite_texte[0].poid }]);
      //     setMotsPhrase([{ value: textData.pourcentagemotsphrase, poid: motsPhrase[0].poid }]);
      //     setMotUnique([{ value: textData.pourcentagemotsuniques, poid: motUnique[0].poid }]);
      //     setMotsPhrase([{ value: textData.pourcentagemotsphrase, poid: motsPhrase[0].poid }]);
      //     setAbreviations([{ value: textData.pourcentatgeabreviation, poid: abreviations[0].poid }]);
      //     setParenthese([{ value: textData.pourcentageparentheses, poid: parentheses[0].poid }]);
      //     setFautesOrthographe([{ value: textData.pourcentagefautesorthographe, poid: fautesOrthographe[0].poid }]);
      //     setCrossreference([{ value: textData.pourcentagecrossreference, poid: crossreference[0].poid }]);
      //     setDiffuculteGrammaticale([{ value: textData.pourcentagedifficultgrammaticale, poid: diffuculteGrammaticale[0].poid }]);
      //     setPolysemie([{ value: textData.pourcentagepolysemie, poid: polysemie[0].poid }]);
      //     setSynonymes([{ value: textData.pourcentagesynonymes, poid: synonymes[0].poid }]);
      //     setHashtags([{ value: textData.pourcentagehashtags, poid: hashtags[0].poid }]);
      //     setPresenseHashtag([{ value: textData.presencehashtags, poid: presenseHashtag[0].poid }]);
      //     setPdositionHashtag([{ value: textData.positionhashtag, poid: positionHashtag[0].poid }]);
      //     setEmojis([{ value: textData.emojis, poid: emojies[0].poid }]);
      //   }
      // }, [textData]);
    
      // const combinedData = {
      //   qualite_texte: qualite_texte[0],
      //   presence_texte: presencetexte[0],
      //   emojies: emojies[0],
      //   syntaxique: syntaxique[0],
      //   semantique: semantique[0],
      //   motUnique: motUnique[0],
      //   motsPhrase: motsPhrase[0],
      //   abreviations: abreviations[0],
      //   parenthese: parentheses[0],
      //   fautesOrthographe: fautesOrthographe[0],
      //   crossreference: crossreference[0],
      //   diffuculteGrammaticale: diffuculteGrammaticale[0],
      //   polysemie: polysemie[0],
      //   synonymes: synonymes[0],
      //   hashtags: hashtags[0],
      //   presenseHashtag: presenseHashtag[0],
      //   positionHashtag: positionHashtag[0],
      //   texte: texte[0]
      // };
      // // console.log(combinedData)
      // let syntax=0
      // let syment
      // const handleSubmit =(event) => {
      //   // console.log("wiii")
      //   let maxsyn=-1
      //   let maxsynt=Math.max(maxsyn,parseFloat(motsPhrase[0].poid),parseFloat(motUnique[0].poid),parseFloat(parentheses[0].poid),parseFloat(fautesOrthographe[0].poid),parseFloat(abreviations[0].poid))
    
      //   let syntcri=[motsPhrase[0],motUnique[0],parentheses[0],fautesOrthographe[0],abreviations[0]]
      //   for(let i=0;i<syntcri.length;i++){
      //     // console.log(i)
      //     if(parseFloat(syntcri[i].poid)===maxsynt){
      //       syntax=syntcri[i].value
      //     }
      //   }
      //   let maxsym=-1
      //   let maxsyme=Math.max(maxsym,parseFloat(synonymes[0].poid),parseFloat(polysemie[0].poid),parseFloat(diffuculteGrammaticale[0].poid),parseFloat(crossreference[0].poid))
      //   let symcri=[synonymes[0],polysemie[0],diffuculteGrammaticale[0],crossreference[0]]
      //   for(let i=0;i<symcri.length;i++){
      //     // console.log(i)
      //     if(parseFloat(symcri[i].poid)===maxsyme){
      //       syment=symcri[i].value
      //     }
      //   }
      //   setSyntaxique([{ value: syntax, poid: syntaxique[0].poid }])
      //   setSemantique([{ value: syment, poid: semantique[0].poid }])
      //   if(syntaxique[0].poid>semantique[0].poid){
      //     setQualiteTexte([{ value: syntaxique[0].value, poid: qualite_texte[0].poid }])
      //   }else{
      //     setQualiteTexte([{ value: semantique[0].value, poid: qualite_texte[0].poid }])
      //   }
      //   if(presenseHashtag[0].poid > positionHashtag[0].poid ){
      //     setHashtags([{value:presenseHashtag[0].value , poid:hashtags[0].poid }])
      //   }else{
      //     setHashtags([{value: positionHashtag[0].value , poid : hashtags[0].poid}])
      //   }
        
      //   let maxtext=Math.max(parseFloat(hashtags[0].poid),parseFloat(qualite_texte[0].poid),parseFloat(emojies[0].poid),parseFloat(presencetexte[0].poid))
      //   let textlist=[hashtags[0],qualite_texte[0],emojies[0],presencetexte[0]]
      //   for(let i=0;i<textlist.length;i++){
      //     if(parseFloat(textlist[i].poid)==maxtext){
      //       setTexte([{value : textlist[i].value , poid : texte[0].poid}])
      //       break
      //     }
      //   }
      //   // useEffect(()=>{
      //   //   setSyntaxique([{ value: syntax, poid: syntaxique[0].poid }])
      //   //   setSemantique([{ value: syment, poid: semantique[0].poid }])
      //   // },[])
      //   // console.log(maxsyme)
        
      // // console.log(combinedData)
      // console.log(texte[0].value)



      // }

    return(
        


        <div className="text">
            <div className="textTitle">
                <h2 className="pqheader">Texte</h2>
                <input type="checkbox" defaultChecked id="textt"/>
            </div>
            
            <div className="presenceTexteConainer sousCritereContainer">
                <h3 >Présence du texte</h3>
                <div className="inputDiv">
                    <input type="checkbox" defaultChecked/>
                    <span>Présence du texte</span>
                    <input type="number" className="inputPoid" placeholder="poids" onChange={handlePresencePoidChange}/>
                </div>
                
            </div>

            <div className="TextQuality sousCritereContainer">
              <div className="testquality">
              <input type="checkbox" defaultChecked/>
                <h3>Lisibilité et clarté du texte</h3>
                <input type="number" className="inputPoid" placeholder="poids" onChange={handleQualitePoidChange}/>
              </div>

                
                <div className="textQualityContainer">
                    <div>
                            <div className="inputTable">
                                <input type="checkbox" defaultChecked/>
                                <span>Lisibilité</span>
                                <input type="number" className="inputPoid" placeholder="poids" onChange={handleSyntaxiquePoidChange}/>
                            </div>
                            <table className="Qualite">
                                {/* <caption>Lisibilité</caption> */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Critère</th>
                                        <th>Poid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="checkbox" defaultChecked /></td>
                                        <td>Pourcentage de mots uniques</td>
                                        <td><input type="number" className="inputPoid" placeholder="poids" onChange={handleMotUniquePoidChange}/></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" defaultChecked /></td>
                                        <td>Pourcentage de mots par phrase</td>
                                        <td><input type="number" className="inputPoid" placeholder="poids" onChange={handleMotsPhrasePoidChange}/></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" defaultChecked /></td>
                                        <td>Pourcentage de fautes d'orthographe</td>
                                        <td><input type="number" className="inputPoid" placeholder="poids" onChange={handleFautesOrthographePoidChange}/></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" defaultChecked /></td>
                                        <td>Pourcentage de parenthèses</td>
                                        <td><input type="number" className="inputPoid" placeholder="poids" onChange={handleParenthesesPoidChange}/></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" defaultChecked /></td>
                                        <td>Pourcentage d'abréviations</td>
                                        <td><input type="number" className="inputPoid" placeholder="poids" onChange={handleAbreviationsPoidChange}/></td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    <div >
                        <div className="inputTable">
                            <input type="checkbox" defaultChecked/>
                            <span>Clarté</span>
                            <input type="number" className="inputPoid" placeholder="poids" onChange={handleSemantiquePoidChange}/>
                        </div>
                        <table className="Qualite">
                            {/* <caption>Clarté</caption> */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Critère</th>
                                <th>Poids</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" defaultChecked onChange={handleCrossreferencePoidChange} /></td>
                                <td>Pourcentage de références croisées</td>
                                <td><input type="number" className="inputPoid" placeholder="poids" onChange={handleCrossreferencePoidChange}/></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" defaultChecked /></td>
                                <td>Pourcentage de difficulté grammaticale</td>
                                <td><input type="number" className="inputPoid" placeholder="poids" onChange={handleDiffuculteGrammaticalePoidChange}/></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" defaultChecked /></td>
                                <td>Pourcentage de polysémie</td>
                                <td><input type="number" className="inputPoid" placeholder="poids" onChange={handlePolysemiePoidChange}/></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" defaultChecked /></td>
                                <td>Pourcentage de synonymes</td>
                                <td><input type="number" className="inputPoid" placeholder="poids" onChange={handleSynonymesPoidChange}/></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
            <div className="hashtags sousCritereContainer">
                <h3>Qualité des Hashtags</h3>
               
                <div className="inputDiv">
                    <input type="checkbox" defaultChecked/>
                    <span>Critère de qualité des hashtags</span>
                    <input type="number" className="inputPoid" placeholder="poids" onChange={handleHeshtagsPoidChange}/>
                </div>
                <div className="hashtagscontainer ">
                    <div className="inputDiv">
                        <input type="checkbox" defaultChecked/>
                        <span>Présnece</span>
                        <input type="number" className="inputPoid" placeholder="poids" onChange={handlePresenseHashtagPoidChange}/>
                    </div>
                    <div className="inputDiv">
                        <input type="checkbox" defaultChecked/>
                        <span>Position</span>
                        <input type="number" className="inputPoid" placeholder="poids" onChange={handlePositionHashtagPoidChange}/>
                    </div>
               
                </div>
            </div>
            <div className="emojis sousCritereContainer">
                <h3>Utilisation des pictogrammes/emojis</h3>
                <div className="inputDiv">
                    <input type="checkbox" defaultChecked/>
                    <span>Critère de l'utilisation des pictogrammes</span>
                    <input type="number" className="inputPoid" placeholder="poids" onChange={handleEmojisPoidChange}/>
                </div>
            </div>
            <div className="others sousCritereContainer">
                <h3>Ajouter des autres critères</h3>
                <div className="ajoutCritere">
                    <input type="checkbox" defaultChecked/>
                    <input type="text" placeholder="Nom du critère" />
                    <input type="number" placeholder="Poids du critere"/>
                    <select name="" id="">
                        <option value="">choisir un niveau</option>
                        <option value="">Faible</option>
                        <option value="">Moyen</option>
                        <option value="">Fort</option>
                    </select>
                </div>
                <div className="ajoutButtonContainer">
                    <button className="ajoutButtun">Ajouter</button>
                </div>
            </div>
            <div className="soumettre sousCritereContainer">
                <div className="textpoid">
                    <label htmlFor="">Ajouter le poids du texte</label>
                    <input type="number" placeholder="Poids du texte" className="inputPoid" onChange={handleTextChange}/>
                </div>
                <button type="submit" className="ajoutButtun" onClick={chosefunction}>Soumettre</button>
            </div>
            
        </div>
    )
}