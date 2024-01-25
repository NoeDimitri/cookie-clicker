import './upgrade.css'
import { Image } from 'react-bootstrap';
import { PurchasedUpgrades, NumCookiesContext } from './CookieApp';
import { useContext } from 'react';

function Upgrade({upgradeInfo, updateMultiplier}){
    
    const {upgrades, setUpgrades} = useContext(PurchasedUpgrades)
    const {CookieCount, setCookie} = useContext(NumCookiesContext)

    let upgradeClass = 'upgrade-box';
    let imageClass = 'upgrade-image';

    if(CookieCount >= upgradeInfo.price){
        upgradeClass += ' purchasable';
    }
    else{
        upgradeClass += ' not-purchasable';
        imageClass += ' not-purchasable';
    }

    function purchaseUpgrade(event){
        if(CookieCount >= upgradeInfo.price)
        {
            let tempUpgrades = upgrades;
            tempUpgrades.add(upgradeInfo.id);
            setUpgrades(tempUpgrades);
            setCookie(CookieCount - upgradeInfo.price);
            updateMultiplier(upgradeInfo.id, upgradeInfo.multiplier);
        }
    }

    return(
        <div className={upgradeClass} onClick={purchaseUpgrade}>
            <Image draggable={false} className={imageClass} src={require(".//images/cookie.png")}/>
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