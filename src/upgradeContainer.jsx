import './upgrade.css'
import Upgrade from './upgrade';
import { upgradeInfo } from './upgradeInfo';


function UpgradeContainer({upgradeList, updateMultiplier}){

    var upgradeBoxes = upgradeInfo.filter(upgrade => 
        upgradeList.has(upgrade.id)).map(upgrade => 
            <Upgrade 
                key={upgrade.id}
                upgradeInfo={upgrade}
                updateMultiplier={updateMultiplier}>
            </Upgrade>);
    return(
        <div id="upgrade-parent">
        <div id="upgrade-title">Upgrades!!</div>
            <div id="upgrade-container">
                {upgradeBoxes}
            </div>
        </div>
    );

}

export default UpgradeContainer; 