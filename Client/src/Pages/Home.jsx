import {FaUser} from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa';
import { useState,useEffect } from 'react';
import './Home.css'

export default function Home(){
    const [textcontent,setText]=useState("")
    const [imagecontent, setImage]=useState("")
    const [videocontent, setVideomin]=useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        let d={
            'textcontent':textcontent,
            'imagecontent':imagecontent,
            'videocontent':videocontent

        }
        const response = await fetch('http://localhost:8080/home', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({d}),
        });
        const data = await response.json();
        // setResult(data.count);
        // setWords(data.words)
        console.log(d)
      };
    //   useEffect(() => {
    //     console.log(text); // this will log the updated words state
    //   }, [text]);
    
    return(
        <div className="homePage">
            <div className="welcome">
                <h1>Bienvenu</h1>
                <div>
                    Cette plateforme vous permet d'évaluer la qualité d'une poste de la plateforme X, il suffit de saisir toutes les informations nécessaires et de suivre les étapes.
                </div>

            </div>
            <div className="inputPost">
                <div className='desc'>
                    <h2>Les information du poste</h2>
                    <div>Dans Cette partie vous devez saisir les information du poste</div>
                </div>
                <div className="poste">
                    <div className="userImage">
                        <FaUser size={24} color="#00acee" />
                    </div>
                    <div className='postcontainer'>
                        <div className="user">
    
                        
                                <input type="text" placeholder="User Name" className="usernameInput"/>
                                <FaCheckCircle size={18} color="#00acee" />
                                <label htmlFor="" className='graylabel'>@Saisir le nom de l'utilisateur</label>
                          
                            
                        </div>
                        <div className="texte">
                            <textarea name="" id="text" placeholder='Saisir le texte de votre poste' className='texteinput' rows={14} cols={59} onChange={(event)=> setText(event.target.value)}></textarea>
                        </div>
                        <div className="image">
                            <label htmlFor="" className='graylabel'>
                                Ajouter une image : 
                                <input type="text" placeholder="Saisir le lien de l'image" id="" onChange={(event)=>setImage(event.target.value)} />
                            </label>
                            
                        </div>
                        <div className="image">
                            <label htmlFor="" className='graylabel'>
                                Faire saisir la miniature du video: 
                                <input type="text" placeholder="Saisir le lien de la miniature" name="" id="" onChange={(event)=>setVideomin(event.target.value)} />
                            </label>
                            
                        </div>
                        <div className="submit">
                            <button type='submit' onClick={handleSubmit}>Suivant</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}