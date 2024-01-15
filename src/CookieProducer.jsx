import './App.css';

function CookieProducer({NumCookies, CookieDecrease, CPS, CPSModify}){

    function purchaseProducer(event){
        CookieDecrease(NumCookies - 1);
        CPSModify(CPS + 1);
    };

    return(
        <div class="producer-container" onClick={purchaseProducer}>
            Purchase tiny CPS upgrade
        </div>
    );

}

export default CookieProducer; 