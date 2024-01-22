import './App.css';
import './cookieProducer.css';
// import { useState } from 'react';

function CookieProducer({Producer, NumCookies, CookieDecrease, CPSModify}){
    
    let producerClass = "producer-container"

    let current_price = Math.ceil(Producer.basePrice * 1.15 ** Producer.quantity);

    if (NumCookies >= current_price)
    {
        producerClass += " purchasable"
    }
    else
    {
        producerClass += " not-purchasable"
    }

    function purchaseProducer(event){
        if (NumCookies >= current_price)
        {
            CookieDecrease(NumCookies - current_price);
            CPSModify(Producer.name);
        }
    };

    return(
        <div className={producerClass} onClick={purchaseProducer}>
            <div className="producer-info">
                <div className="producer-info-child">
                    {Producer.name}
                </div>
                <div className="producer-info-child">
                    Price: {current_price.toLocaleString('en', {useGrouping:true})}
                </div>
                <div className="producer-info-child" style={{textAlign:"right"}}>
                    {Producer.quantity}
                </div>
            </div>
        </div>
    );

}

export default CookieProducer; 