import './App.css';
import { Image } from 'react-bootstrap';

function Cookie({NumCookies, CookieIncrease, CPS}){

    return(
        <div id="cookie-container">
            <span class="cookie-text">You have a total of {NumCookies} cookies</span>
            <span class="cookie-text" style={{fontSize:"2rem"}}>{CPS} CPS</span>

            <div style={{padding:"3rem"}}>
                <Image onClick={() => CookieIncrease(NumCookies + 1)} draggable={false} id="cookie-image" src="images/cookie.png"/>
            </div>
        </div>
    );

}

export default Cookie; 