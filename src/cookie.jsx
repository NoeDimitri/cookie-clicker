import './App.css';
import './cookie.css';
import { Image } from 'react-bootstrap';

function Cookie({NumCookies, CookieIncrease, CPS}){

    function roundNumber(num){
        return (Math.round(num * 100) / 100).toFixed(1);
    }
    return(
        <div id="cookie-container">
            <span className="cookie-text">You have a total of {Math.floor(NumCookies)} cookies</span>
            <span className="cookie-text" style={{fontSize:"2rem"}}>{roundNumber(CPS)} CPS</span>
            <div style={{padding:"3rem"}} className="animation-rotate">
                <Image onClick={() => CookieIncrease(NumCookies + 1)} draggable={false} id="cookie-image" src={require(".//images/cookie.png")}/>
            </div>
        </div>
    );

}

export default Cookie; 