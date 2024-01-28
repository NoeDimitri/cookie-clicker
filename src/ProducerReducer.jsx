export function ProducerReducer(draft, action)
{
  switch (action.type){
    case 'producerPurchase': {
      const index = draft.findIndex((producer) => producer.id === action.producerId)
      if (index === -1)
      {
        throw Error('Producer name ' + action.producerId + ' not recognized.');
      }
      draft[index]['quantity'] += 1;
      break;
    }
    case 'increaseMultiplier':{
      const index = draft.findIndex((producer) => producer.id === action.producerId)
      if (index === -1)
      {
        throw Error('Producer id ' + action.producerId + ' not recognized.');
      }
      draft[index]['multiplier'] *= action.multiplier;
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
        draft[index]['multiplier'] = save.multiplier;

      }
      );
      break;
    }
    default: {
      throw Error('unknown action: ' + action.type)
    }
  }
}

export let producerData = [
    {
      id: 0,
      name: "Cursor",
      basePrice: 15,
      CPS: 0.1,
      multiplier: 1.0,
      imagePath: "",
      quantity: 0,
    },
    {
      id: 1,
      name: "Oven",
      basePrice: 100,
      CPS: 1,
      multiplier: 1.0,
      imagePath: "",
      quantity: 0,
    },
    {
      id: 2,
      name: "Bakery",
      basePrice: 1100,
      CPS: 10,
      multiplier: 1.0,
      imagePath: "",
      quantity: 0,
    },
    {
      id: 3,
      name: "Cool Baker Dog",
      basePrice: 12000,
      CPS: 47,
      multiplier: 1.0,
      imagePath: "",
      quantity: 0,
    },
    {
      id: 4,
      name: "Factory",
      basePrice: 130000,
      CPS: 260,
      multiplier: 1.0,
      imagePath: "",
      quantity: 0,
    },
    {
      id: 5,
      name: "Benjamin Banking",
      basePrice: 1400000,
      CPS: 1400,
      multiplier: 1.0,
      imagePath: "",
      quantity: 0,
    },
    {
      id: 8,
      name: "King Cheebo",
      basePrice: 170000000000000,
      CPS: 430000000,
      multiplier: 1.0,
      imagePath: "",
      quantity: 0,
    }
  ]