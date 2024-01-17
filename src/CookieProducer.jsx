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
        <div class={producerClass} onClick={purchaseProducer}>
            <div class="producer-info">
                <div class="producer-info-child">
                    {Producer.name}
                </div>
                <div class="producer-info-child">
                    Number Owned: {Producer.quantity}
                </div>
                <div class="producer-info-child" style={{textAlign:"right"}}>
                    {Producer.price}
                </div>
            </div>
        </div>
    );

}

export default CookieProducer; 