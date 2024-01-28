import './App.css';
import './cookieProducer.css';
import { useContext } from 'react';
import { NumCookiesContext } from './CookieApp';

function CookieProducer({Producer, CPSModify}){
    
    const {CookieCount, setCookie} = useContext(NumCookiesContext)


    let producerClass = "producer-container"

    let current_price = Math.ceil(Producer.basePrice * 1.15 ** Producer.quantity);

    if (CookieCount >= current_price)
    {
        producerClass += " purchasable"
    }
    else
    {
        producerClass += " not-purchasable"
    }

    function purchaseProducer(event){
        if (CookieCount >= current_price)
        {
            setCookie(CookieCount - current_price);
            CPSModify(Producer.id);
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