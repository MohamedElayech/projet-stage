import Picture from './Picture.jsx';
import Video from './Video.jsx';
import './pic.css';
export default function presentationQuality(){

    return(
        <div>
            <h1>Presentation Quality -  Qualité de Presentation</h1>
            <h2 className="titre"> Picture</h2>
            <Picture />
            <h2 className="titre"> Video</h2>
            <Video />
        </div>
        
    );
}