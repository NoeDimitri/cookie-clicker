import './upgrade.css'
import { upgradeInfo } from './upgradeInfo';


function UpgradeContainer({upgradeList}){

    var upgradeBoxes = upgradeInfo.filter(upgrade => 
        upgradeList.has(upgrade.id)).map(upgrade => 
            <div key={upgrade.id}>
                {upgrade.name}
            </div>);
        
    return(
        <div>
            {upgradeBoxes}
        </div>
    );

}

export default UpgradeContainer; 