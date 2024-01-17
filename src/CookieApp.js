import './App.css';
import Cookie from './cookie';
import CookieProducer from './CookieProducer';
import { useState, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';

function ProducerReducer(draft, action)
{
  switch (action.type){
    case 'producerPurchase': {
      const index = draft.findIndex((producer) => producer.name === action.producerName)
      if (index === -1)
      {
        throw Error('Producer name ' + action.producerName + ' not recognized.');
      }
      draft[index]['quantity'] += 1;
      break;
    }
    case 'loadSave':{
      action.producerSave.forEach((save) => {
        const index = draft.findIndex((producer) => save.id === producer.id);
        if(index === -1)
        {
          return;
        }
        draft[index]['quantity'] = save.quantity;
      }
      );
      break;
    }
    default: {
      throw Error('unknown action: ' + action.type)
    }
  }
}

let initialProducers = [
  {
    id: 0,
    name: "Cursor",
    basePrice: 5,
    CPS: 0.1,
    imagePath: "",
    quantity: 0,
  },
  {
    id: 1,
    name: "Oven",
    basePrice: 30,
    CPS: 1,
    imagePath: "",
    quantity: 0,
  },
  {
    id: 2,
    name: "Bakery",
    basePrice: 150,
    CPS: 10,
    imagePath: "",
    quantity: 0,
  },
  {
    id: 3,
    name: "Factory",
    basePrice: 1000,
    CPS: 25,
    imagePath: "",
    quantity: 0,
  },
  {
    id: 4,
    name: "King Cheebo",
    basePrice: 20000,
    CPS: 100,
    imagePath: "",
    quantity: 0,
  }
]

function CookieApp() {
  const [CookieCount, setCookie] = useState(0);
  const [Producers, dispatch] = useImmerReducer(ProducerReducer, initialProducers);

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

  function handleLoadingSave(previousSave){
    dispatch({
      type: 'loadSave',
      producerSave: previousSave
    })
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
    // Update the producer quantities
    if(localStorage.getItem('producerSave'))
      handleLoadingSave(JSON.parse(localStorage.getItem('producerSave')));
    
    if (localStorage.getItem('NumCookies'))
    {
      if (localStorage.getItem('previousDate') && localStorage.getItem('producerSave')){
        let elapsedSeconds = Math.ceil((Date.now() - JSON.parse(localStorage.getItem('previousDate'))) / 1000);
        let cookieGain = elapsedSeconds * calculateCPS(JSON.parse(localStorage.getItem('producerSave')));
        setCookie(JSON.parse(localStorage.getItem('NumCookies')) + cookieGain);
      }
      else{
        setCookie(JSON.parse(localStorage.getItem('NumCookies')));
      }
    }
    },[]);

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
    }
    window.addEventListener("beforeunload", saveState);
  })

  return (
    <div id="column-wrapper">
      <div id="cookie-box">
        <Cookie NumCookies={CookieCount} CookieIncrease={setCookie} CPS={calculateCPS(Producers)}></Cookie>
      </div>
      <div id="upgrade-box">
        {producerList}
      </div>
    </div>
  );
}

export default CookieApp;
