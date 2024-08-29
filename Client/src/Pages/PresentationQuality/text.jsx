// import { handle } from "express/lib/application"n
import { useState } from "react"
import "./text.css"

export default function Text(){
    // const [count,setCount] =  useState(0)
    // const handlePoidChange = (newPoid) => {
    //     setCount(newPoid); // Update count state based on the new poid
    //   };
    const [qualite_texte,setQualiteTexte]=useState([{ value: '', poid: '' }])
    const [presence_texte,setPresenceTexte]=useState([{ value: '', poid: '' }])
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
    const [heshtags,setHashtags]=useState([{ value: '', poid: '' }])
    const [presenseHashtag,setPresenseHashtag]=useState([{ value: '', poid: '' }])
    const [positionHashtag,setPdositionHashtag]=useState([{ value: '', poid: '' }])
    

    const textData = {
        "qualite_texte" : [0,'failbe'],
        "presence_texte":[0,'faible'],
        "emojis":[0,'faible'],
        "sytaxique":[0,'faible'],
        "semantique":[0,'faible'],
        "mots_unique":[0,'faible'],
        "mots_phrase":[0,'faible'],
        "abreviations":[0,'faible'],
        "parentheses":[0,'faible'],
        "fautes_orthographe":[0,'faible'],
        "crossreference":[0,'faible'],
        "difficulte_grammaticale":[0,'faible'],
        "polysemie":[0,'faible'],
        "synonymes":[0,'faible'],
        "hashtags":[0,'faible'],
        "presnace_#":[0,'faible'],
        "position_#":[0,'faible'],

    }


    const handleQualitePoidChange = (event) => {
        const poidValue = event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setQualiteTexte([{ value: qualite_texte[0].value, poid: poidValue }]);
      };
      
      const handlePresencePoidChange = (event) => {
        const poidValue = event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setPresenceTexte([{ value: presence_texte[0].value, poid: poidValue }]);
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
        setHashtags([{ value: heshtags[0].value, poid: poidValue }]);
      };
      
      const handlePresenseHashtagPoidChange = (event) => {
        const poidValue = event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setPresenseHashtag([{ value: presenseHashtag[0].value, poid: poidValue }]);
      };
      
      const handlePositionHashtagPoidChange = (event) => {
        const poidValue = event.target.parentNode.querySelector('input[type="checkbox"]').checked ? event.target.value : 0;
        setPdositionHashtag([{ value: positionHashtag[0].value, poid: poidValue }]);
      };
    

      console.log({
        qualite_texte: qualite_texte[0].poid,
        presence_texte: presence_texte[0].poid,
        emojies: emojies[0].poid,
        syntaxique: syntaxique[0].poid,
        semantique: semantique[0].poid,
        motUnique: motUnique[0].poid,
        motsPhrase: motsPhrase[0].poid,
        abreviations: abreviations[0].poid,
        parentheses: parentheses[0].poid,
        fautesOrthographe: fautesOrthographe[0].poid,
        crossreference: crossreference[0].poid,
        diffuculteGrammaticale: diffuculteGrammaticale[0].poid,
        polysemie: polysemie[0].poid,
        synonymes: synonymes[0].poid,
        heshtags: heshtags[0].poid,
        presenseHashtag: presenseHashtag[0].poid,
        positionHashtag: positionHashtag[0].poid
      });
    return(
        


        <div className="text">
            <div className="textTitle">
                <h2 className="pqheader">Texte</h2>
                <input type="checkbox" defaultChecked/>
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
                <h3>Lisibilité et clarté du texte</h3>
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
                                <td><input type="number" className="inputPoid" placeholder="poids" /></td>
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
            
        </div>
    )
}