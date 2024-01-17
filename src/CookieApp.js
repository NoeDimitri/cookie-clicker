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
      draft[index]['price'] = Math.floor(draft[index]['price']*1.3**draft[index]['quantity']);
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
    price: 5,
    CPS: 0.1,
    imagePath: "",
    quantity: 0,
  },
  {
    id: 1,
    name: "Oven",
    price: 5,
    CPS: 3,
    imagePath: "",
    quantity: 0,
  },
  {
    id: 2,
    name: "Bakery",
    price: 150,
    CPS: 10,
    imagePath: "",
    quantity: 0,
  },
  {
    id: 3,
    name: "Factory",
    price: 1000,
    CPS: 25,
    imagePath: "",
    quantity: 0,
  },
  {
    id: 4,
    name: "King Cheebo",
    price: 20000,
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
