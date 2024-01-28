import './App.css';
import Cookie from './cookie';
import CookieProducer from './CookieProducer';
import { upgradeInfo } from './upgradeInfo.jsx';
import { useState, useEffect, createContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { producerData, ProducerReducer} from './ProducerReducer.jsx';
import UpgradeContainer from './upgradeContainer.jsx';

export const PurchasedUpgrades = createContext();
export const NumCookiesContext = createContext();

function CookieApp() {
  const [CookieCount, setCookie] = useState(0);
  const [Producers, dispatch] = useImmerReducer(ProducerReducer, producerData);
  const [upgrades, setUpgrades] = useState(new Set());
  const [availableUpgrades, setAvailableUpgrades] = useState(new Set());

  const version = "1.01";
  const CPSRefreshRate = 100;

  var producerList = Producers.map(producer => 
    <CookieProducer 
      key={producer.id}
      Producer={producer}  
      CPSModify={handlePurchaseProducer}>
    </CookieProducer>
  );

  function handlePurchaseProducer(producerId){
    dispatch({
      type: 'producerPurchase',
      producerId: producerId
    });
  }

  function handleMultiplerProduce(producerId, multiplier)
  {
    dispatch({
      type: 'increaseMultiplier',
      producerId: producerId,
      multiplier: multiplier
    });
  }

  function calculateCPS(producers){
    let CPS = 0;
    producers.forEach(producer => {
      CPS += producer.quantity * producer.CPS * producer.multiplier;
    });
    return CPS;
  }

  // Every cookie update, update what upgrades you can purchase
  useEffect(() => {
    let newSet = new Set();
    upgradeInfo.forEach(upgrade => {
      if(!upgrades.has(upgrade.id) && CookieCount >= upgrade.cookieThreshold){
        newSet.add(upgrade.id)
      }
    });
    setAvailableUpgrades(newSet);
  }, [CookieCount, upgrades])

  //#region saving_loading

  // This thing is the timer that updates the cookies on intervals
  useEffect(() => {
    const myInterval = setInterval(() => {
      setCookie(CookieCount + calculateCPS(Producers)/10);
    }, CPSRefreshRate);
    return () => clearInterval(myInterval); 
  }, [CookieCount, Producers]);

  // Load old save
  useEffect(()=>{
    function handleLoadingSave(previousSave){
      dispatch({
        type: 'loadSave',
        producerSave: previousSave
      })
    }

    // Check if version matches
    if (JSON.parse(localStorage.getItem('version')) === version)
    {
      // Update the producer quantities
      if(localStorage.getItem('producerSave'))
        handleLoadingSave(JSON.parse(localStorage.getItem('producerSave')));
      
      // Ensure we have valid number of cookies
      if (localStorage.getItem('NumCookies'))
      {
        // Calculate Cookies gained since login (if possible)
        if (localStorage.getItem('previousDate') && localStorage.getItem('producerSave')){
          let elapsedSeconds = Math.ceil((Date.now() - JSON.parse(localStorage.getItem('previousDate'))) / 1000);
          let cookieGain = elapsedSeconds * calculateCPS(JSON.parse(localStorage.getItem('producerSave')));
          setCookie(JSON.parse(localStorage.getItem('NumCookies')) + cookieGain);
        }
        else{
          setCookie(JSON.parse(localStorage.getItem('NumCookies')));
        }
      }
      if (localStorage.getItem('purchasedUpgrades')){
        setUpgrades(new Set(JSON.parse(localStorage.getItem('purchasedUpgrades'))));
      }
    }
    }, [dispatch]);

  // Save State before browser cuts out
  useEffect(() => {
    const saveState = (ev) => {
      let producerSave = Producers.map((producer) => {
        return {
          id: producer.id,
          quantity: producer.quantity,
          CPS: producer.CPS,
          multiplier: producer.multiplier
        }
      })
      localStorage.setItem("NumCookies", JSON.stringify(CookieCount));
      localStorage.setItem("producerSave", JSON.stringify(producerSave));
      localStorage.setItem("purchasedUpgrades", JSON.stringify([...upgrades]));
      localStorage.setItem("previousDate", JSON.stringify(Date.now()));
      localStorage.setItem("version", JSON.stringify(version));
    }
    window.addEventListener("beforeunload", saveState);
  })

  //#endregion

  return (
    <NumCookiesContext.Provider value={{
      CookieCount,
      setCookie
      }}>
      <PurchasedUpgrades.Provider value={{upgrades, setUpgrades}}>
        <div id="column-wrapper">
          <div id="cookie-box">
            <Cookie CPS={calculateCPS(Producers)}></Cookie>
          </div>
          <div id="upgrade-box">
            <UpgradeContainer 
              upgradeList={availableUpgrades}
              updateMultiplier={handleMultiplerProduce}>
            </UpgradeContainer>
          </div>
          <div id="producer-box">
            {producerList}
          </div>
        </div>
      </ PurchasedUpgrades.Provider>
    </NumCookiesContext.Provider>
  );
}

export default CookieApp;
