import './App.css';
// import { useState } from 'react';

function CookieProducer({Producer, NumCookies, CookieDecrease, CPSModify}){
    
    let producerClass = "producer-container"

    if (NumCookies >= Producer.price)
    {
        producerClass += " purchasable"
    }
    else
    {
        producerClass += " not-purchasable"
    }

    function purchaseProducer(event){
        if (NumCookies >= Producer.price)
        {
            CookieDecrease(NumCookies - Producer.price);
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
                    Price: {Producer.price}
                </div>
                <div className="producer-info-child" style={{textAlign:"right"}}>
                    {Producer.quantity}
                </div>
            </div>
        </div>
    );

}

export default CookieProducer; 