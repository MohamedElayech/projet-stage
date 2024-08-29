import Text from "./Text"
import Image from "./Image"
import Video from "./Video"
import Others from "./Others"
export default function PresentaionQuality(){
    
    return(
        <div>
            <h1 style={{padding:'5vh 0 0 10vw  '}}>Presentation Quality -  Qualité de Presentation</h1>
            <div>
                <Text></Text>
                <Image></Image>
                <Video></Video>
                <Others></Others>
            </div>
        </div>
        
    )
}