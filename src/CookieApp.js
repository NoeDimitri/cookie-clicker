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
      // return Producers.map((producer) => {
      //   if (producer.name == action.producerName){
      //     producerUpdated = {};
      //     Object.assign(producerUpdated, producer);
      //     producerUpdated['quantity'] += 1;
      //     return producerUpdated
      //   }
      //   else
      //   {
      //     return producer;
      //   }
      // })
    }
    default: {
      throw Error('unknown action: ' + action.type)
    }
  }
}

let initialProducers = [
  {
    name: "cursor",
    price: 5,
    CPS: 1,
    imagePath: "",
    quantity: 0,
  }
]

function CookieApp() {
  const [CookieCount, setCookie] = useState(0);
  const [Producers, dispatch] = useImmerReducer(ProducerReducer, initialProducers);

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
      setCookie(CookieCount + calculateCPS(Producers));
    }, 1000);
    return () => clearInterval(myInterval); 
  }, [CookieCount, Producers]);

  return (
    <div id="column-wrapper">
      <div id="cookie-box">
        <Cookie NumCookies={CookieCount} CookieIncrease={setCookie} CPS={calculateCPS(Producers)}></Cookie>
      </div>
      <div id="upgrade-box">
        <CookieProducer NumCookies={CookieCount} CookieDecrease={setCookie} CPSModify={handlePurchaseProducer}></CookieProducer>
      </div>
    </div>
  );
}

export default CookieApp;
