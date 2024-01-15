import './App.css';

function CookieProducer({NumCookies, CookieDecrease, CPS, CPSModify}){

    return(
        <div class="producer-container" onClick={() => CookieDecrease(NumCookies - 1)}>
            Purchase tiny CPS upgrade
        </div>
    );

}

export default CookieProducer; 