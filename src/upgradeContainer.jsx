import './upgrade.css'
import Upgrade from './upgrade';
import { upgradeInfo } from './upgradeInfo';


function UpgradeContainer({upgradeList}){

    var upgradeBoxes = upgradeInfo.filter(upgrade => 
        upgradeList.has(upgrade.id)).map(upgrade => 
            <Upgrade 
                key={upgrade.id}
                upgradeInfo={upgrade}>
            </Upgrade>);
    return(
        <div id="upgrade-parent">
            <div>Upgrades!!</div>
            <div id="upgrade-container">
                {upgradeBoxes}
            </div>
        </div>
    );

}

export default UpgradeContainer; 