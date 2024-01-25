import './upgrade.css'
import { Image } from 'react-bootstrap';

function Upgrade({upgradeInfo}){
    
    return(
        <div class="upgrade-box">
            <Image draggable={false} id="upgrade-image" src={require(".//images/cookie.png")}/>
            <div id="popup-content">
                <div id="upgrade-popup-name">
                    <b>{upgradeInfo.name}</b>
                </div>
                <div id="upgrade-popup-cost">
                    {upgradeInfo.price}
                </div>
                <div id="upgrade-popup-description">
                    {upgradeInfo.description}
                </div>
                <div id="upgrade-popup-flavor">
                    {upgradeInfo.flavor}
                </div>
            </div>
        </div>
    );

}

export default Upgrade; 