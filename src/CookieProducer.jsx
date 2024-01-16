import './App.css';
// import { useState } from 'react';

function CookieProducer({NumCookies, CookieDecrease, CPSModify}){

    // const [canPurchase, setCanPurchase] = useState(true);
    
    let producerClass = "producer-container"

    // if (!canPurchase) {
    //     producerClass += " cannot-purchase";
    // }

    function purchaseProducer(event){
        if (NumCookies >= 5)
        {
            CookieDecrease(NumCookies - 5);
            CPSModify('cursor');
        }
    };

    return(
        <div className={producerClass} onClick={purchaseProducer}>
            Purchase tiny CPS upgrade
        </div>
    );

}

export default CookieProducer; 