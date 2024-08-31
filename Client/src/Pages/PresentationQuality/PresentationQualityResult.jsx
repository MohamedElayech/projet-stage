import './Pqresult.css'

export default function PresentaionQualityResult(){
    return(
        <div className='resultatQP'>
            <div className="sousCriters">
                <div className="subcritiria">
                    <h3>Texte</h3>
                    <p id="textScore">Score du texte</p>
                </div>
                <div className="subcritiria">
                    <h3>
                        Image
                    </h3>
                    <p id="imageScore">
                        Score de l'image
                    </p>
                </div>
                <div className="subcritiria">
                    <h3>
                        Video
                    </h3>
                    <p id="videoS">
                        score de la vidéo
                    </p>
                </div>
            </div>
            <div className="generalscore">
                <h2>Score globale de la qualité de presentation</h2>
                <div id="globalScore">
                    score globale
                </div>
            </div>
        </div>
    )
}