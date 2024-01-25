import './upgrade.css'
import { Image } from 'react-bootstrap';

function Upgrade({upgradeInfo}){
    
    return(
        <div class="upgrade-box">
            <Image draggable={false} id="upgrade-image" src={require(".//images/cookie.png")}/>
            <div id="popup-content">
                <p id="popup-info">
                    put upgrade info here lol
                </p>
            </div>
        </div>
    );

}

export default Upgrade; 