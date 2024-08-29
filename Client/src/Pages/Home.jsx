import {FaUser} from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa';
import './Home.css'

export default function Home(){
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
                            <textarea name="" id="" placeholder='Saisir le texte de votre poste' className='texteinput' rows={14} cols={59}></textarea>
                        </div>
                        <div className="image">
                            <label htmlFor="" className='graylabel'>
                                Ajouter une image : 
                                <input type="file" name="" id="" />
                            </label>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}