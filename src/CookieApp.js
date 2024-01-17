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
    default: {
      throw Error('unknown action: ' + action.type)
    }
  }
}

let initialProducers = [
  {
    id: 0,
    name: "cursor",
    price: 5,
    CPS: 1,
    imagePath: "",
    quantity: 0,
  },
  {
    id: 1,
    name: "oven",
    price: 20,
    CPS: 3,
    imagePath: "",
    quantity: 0,
  },
  {
    id: 2,
    name: "bakery",
    price: 150,
    CPS: 10,
    imagePath: "",
    quantity: 0,
  }
]

function CookieApp() {
  const [CookieCount, setCookie] = useState(0);
  const [Producers, dispatch] = useImmerReducer(ProducerReducer, initialProducers);

  var producerList = initialProducers.map(producer => 
    <CookieProducer 
      Producer={producer} 
      quantity={producer.quantity}
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
