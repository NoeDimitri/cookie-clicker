import './App.css';
// import { useState } from 'react';

function CookieProducer({NumCookies, CookieDecrease, CPS, CPSModify}){

    // const [canPurchase, setCanPurchase] = useState(true);
    
    let producerClass = "producer-container"

    // if (!canPurchase) {
    //     producerClass += " cannot-purchase";
    // }

    function purchaseProducer(event){
        if (NumCookies >= 1)
        {
            CookieDecrease(NumCookies - 1);
            CPSModify(CPS + 1);
        }
    };

    return(
        <div className={producerClass} onClick={purchaseProducer}>
            Purchase tiny CPS upgrade
        </div>
    );

}

export default CookieProducer; 