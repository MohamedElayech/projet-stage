import { handle } from "express/lib/application"
import InputPoid from "./InputPoid"
import { useState } from "react"

export default function Text(){
    const [count,setCount] =  useState(0)
    const handlePoidChange = (newPoid) => {
        setCount(newPoid); // Update count state based on the new poid
      };
    return(
        


        <div>
            <div>
                <form action="" onSubmit={(event) => event.preventDefault()}>
                    <InputPoid name="abrev" defultpoid={0} MyFunction={handlePoidChange}></InputPoid>
                </form>

            </div>




            <h2>Texte</h2>
            <div>
                <h3>Présence du texte</h3>
                <div>
                    <input type="checkbox" checked/>
                    <span>Présence du texte</span>
                    <input type="number"/>
                </div>
                
            </div>

            <div>

                <h3>Lisibilité et clarté du texte</h3>
                <div>
                    <label htmlFor="">Lisibilité</label>
                    <div>
                        <div>
                        <input type="checkbox" checked/>
                        <span>Présence du texte</span>
                        <input type="number"/>
                    </div>
                    <div>
                        <input type="checkbox" checked/>
                        <span>Présence du texte</span>
                        <input type="number"/>
                    </div>
                    <div>
                        <input type="checkbox" checked/>
                        <span>Présence du texte</span>
                        <input type="number"/>
                    </div>
                    <div>
                        <input type="checkbox" checked/>
                        <span>Présence du texte</span>
                        <input type="number"/>
                    </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="">Clarté</label>
                    <div>
                        <div>
                            <input type="checkbox" checked/>
                            <span>Présence du texte</span>
                            <input type="number"/>
                        </div>
                        <div>
                            <input type="checkbox" checked/>
                            <span>Présence du texte</span>
                            <input type="number"/>
                        </div>
                        <div>
                            <input type="checkbox" checked/>
                            <span>Présence du texte</span>
                            <input type="number"/>
                        </div>
                        <div>
                            <input type="checkbox" checked/>
                            <span>Présence du texte</span>
                            <input type="number"/>
                        </div>
                        <div>
                            <input type="checkbox" checked/>
                            <span>Présence du texte</span>
                            <input type="number"/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3>Qualité des Hashtags</h3>
            </div>
            <div>
                <h3>Utilisation des pictogrammes/emojis</h3>
            </div>
            
        </div>
    )
}