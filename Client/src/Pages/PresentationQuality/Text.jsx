// import { handle } from "express/lib/application"n
import InputPoid from "./InputPoid"
import { useState } from "react"
import "./text.css"

export default function Text(){
    // const [count,setCount] =  useState(0)
    // const handlePoidChange = (newPoid) => {
    //     setCount(newPoid); // Update count state based on the new poid
    //   };
    const [qualite_texte,setQuaiteTexte]=useState([])
    const [presence_texte,setPresenceTexte]=useState([])
    const [emojies,setEmojis]=useState([])
    const [syntaxique,setSyntaxique]=useState([])
    const [semantique,setSemantique]=useState([])
    const [motUnique,setMotUnique]=useState([])
    const [motsPhrase,setMotsPhrase]=useState([])
    const [abreviations,setAbreviations]=useState([])
    const [parentheses,setParenthese]=useState([])
    const [fautesOrthographe,setFautesOrthographe]=useState([])
    const [crossreference,setCrossreference]=useState([])
    const [diffuculteGrammaticale,setDiffuculteGrammaticale]=useState([])
    const [polysemie,setPolysemie]=useState([])
    const [synonymes,setSynonymes]=useState([])
    const [heshtags,setHashtags]=useState([])
    const [presenseHashtag,setPresenseHashtag]=useState([])
    const [positionHashtag,setPdositionHashtag]=useState([])

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
    
    return(
        


        <div className="text">
            <div>
                <form action="" onSubmit={(event) => event.preventDefault()}>
                    {/* <InputPoid name="abrev" defaultPoid={0} MyFunction={setCount}></InputPoid> */}
                </form>

            </div>




            <h2 className="pqheader">Texte</h2>
            <div className="presenceTexteConainer">
                <h3>Présence du texte</h3>
                <div>
                    <input type="checkbox" defaultChecked/>
                    <span>Présence du texte</span>
                    <input type="number" className="inputPoid" placeholder="poid"/>
                </div>
                
            </div>

            <div className="TextQuality">
                <h3>Lisibilité et clarté du texte</h3>
                <div className="textQualityContainer">
                    <div>
                        <div>
                            <input type="checkbox" defaultChecked/>
                            <span>Lisibilité</span>
                            <input type="number" className="inputPoid" placeholder="poid"/>
                        </div>
                            <table className="Qualité">
                                <caption>Lisibilité</caption>
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
                                        <td><input type="number" className="inputPoid" placeholder="poid" /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" defaultChecked /></td>
                                        <td>Pourcentage de mots par phrase</td>
                                        <td><input type="number" className="inputPoid" placeholder="poid" /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" defaultChecked /></td>
                                        <td>Pourcentage de fautes d'orthographe</td>
                                        <td><input type="number" className="inputPoid" placeholder="poid" /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" defaultChecked /></td>
                                        <td>Pourcentage de parenthèses</td>
                                        <td><input type="number" className="inputPoid" placeholder="poid" /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" defaultChecked /></td>
                                        <td>Pourcentage d'abréviations</td>
                                        <td><input type="number" className="inputPoid" placeholder="poid" /></td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    <div>
                        <div>
                            <input type="checkbox" defaultChecked/>
                            <span>Clarté</span>
                            <input type="number" className="inputPoid" placeholder="poid"/>
                        </div>
                        <table className="Clarté">
                            <caption>Clarté</caption>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Critère</th>
                                <th>Poids</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" defaultChecked /></td>
                                <td>Pourcentage de références croisées</td>
                                <td><input type="number" className="inputPoid" placeholder="poid" /></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" defaultChecked /></td>
                                <td>Pourcentage de difficulté grammaticale</td>
                                <td><input type="number" className="inputPoid" placeholder="poid" /></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" defaultChecked /></td>
                                <td>Pourcentage de polysémie</td>
                                <td><input type="number" className="inputPoid" placeholder="poid" /></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" defaultChecked /></td>
                                <td>Pourcentage de synonymes</td>
                                <td><input type="number" className="inputPoid" placeholder="poid" /></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
            <div className="hashtags">
                <h3>Qualité des Hashtags</h3>
            </div>
            <div className="emojis">
                <h3>Utilisation des pictogrammes/emojis</h3>
            </div>
            
        </div>
    )
}