import { useImmerReducer } from 'use-immer';

export function ProducerReducer(draft, action)
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

export let initialProducers = [
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