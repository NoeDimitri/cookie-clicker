import './App.css';
import { Image } from 'react-bootstrap';

function Cookie({NumCookies, CookieIncrease, CPS}){

    return(
        <div id="cookie-container">
            <span className="cookie-text">You have a total of {NumCookies} cookies</span>
            <span className="cookie-text" style={{fontSize:"2rem"}}>{CPS} CPS</span>

            {/* why does div element rotate and not image element*/}
            <div style={{padding:"3rem"}} class="animation-rotate">
                <Image onClick={() => CookieIncrease(NumCookies + 1)} draggable={false} id="cookie-image" src="images/cookie.png"/>
            </div>
        </div>
    );

}

export default Cookie; 