import Video from "./Video";
import Text from "./text"; 
import Picture from "./Picture";
import Checklist from "./checkList";
export default function presentationQuality(){

    return(
        <div>
            <Text />
            <Picture />
            <Video />
        </div>
        
    );
}