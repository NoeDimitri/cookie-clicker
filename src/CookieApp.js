import './App.css';
import Cookie from './cookie';
import Upgrade from './upgrade.jsx';
import CookieProducer from './CookieProducer';
import { useState, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { initialProducers, ProducerReducer} from './ProducerReducer.jsx';

function CookieApp() {
  const [CookieCount, setCookie] = useState(0);
  const [Producers, dispatch] = useImmerReducer(ProducerReducer, initialProducers);
  const version = "1.02"

  var producerList = Producers.map(producer => 
    <CookieProducer 
      key={producer.id}
      Producer={producer} 
      NumCookies={CookieCount}
      CookieDecrease={setCookie} 
      CPSModify={handlePurchaseProducer}>
    </CookieProducer>
  );

  function handlePurchaseProducer(producerPurchased, cost){
    dispatch({
      type: 'producerPurchase',
      producerName: producerPurchased,
      cost: cost
    });
  }

  function calculateCPS(producers){
    let CPS = 0;
    producers.forEach(producer => {
      CPS += producer.quantity * producer.CPS;
    });
    return CPS;
  }

  // This thing is the timer that updates the cookies on intervals
  useEffect(() => {
    const myInterval = setInterval(() => {
      setCookie(CookieCount + calculateCPS(Producers)/10);
    }, 100);
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
    }
    }, [dispatch]);

  // Save State before browser cuts out
  useEffect(() => {
    const saveState = (ev) => {
      let producerSave = Producers.map((producer) => {
        return {
          id: producer.id,
          quantity: producer.quantity,
          CPS: producer.CPS
        }
      })
      localStorage.setItem("NumCookies", JSON.stringify(CookieCount));
      localStorage.setItem("producerSave", JSON.stringify(producerSave))
      localStorage.setItem("previousDate", JSON.stringify(Date.now()))
      // localStorage.setItem("version", JSON.stringify(version))
    }
    window.addEventListener("beforeunload", saveState);
  })

  return (
    <div id="column-wrapper">
      <div id="cookie-box">
        <Cookie NumCookies={CookieCount} CookieIncrease={setCookie} CPS={calculateCPS(Producers)}></Cookie>
      </div>
      <div id="upgrade-box">
        <Upgrade></Upgrade>
      </div>
      <div id="producer-box">
        {producerList}
      </div>
    </div>
  );
}

export default CookieApp;
