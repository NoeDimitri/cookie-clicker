import './App.css';
import './cookie.css';
import { Image } from 'react-bootstrap';
import { useContext } from 'react';
import { NumCookiesContext } from './CookieApp';

function Cookie({CPS}){

    const {CookieCount, setCookie} = useContext(NumCookiesContext)

    function roundNumber(num){
        return (Math.round(num * 100) / 100).toFixed(1);
    }
    
    return(
        <div id="cookie-container">
            <span className="cookie-text">
            {CookieCount !== 0 
                ? Math.floor(CookieCount).toLocaleString('en', {useGrouping:true}) + " Cookies"
                : "You have no cookies. :("
            }
            </span>
            <span className="cookie-text" style={{fontSize:"2rem"}}>{roundNumber(CPS)} CPS</span>
            <div style={{padding:"3rem"}} className="animation-rotate">
                <Image onClick={() => setCookie(CookieCount + 1)} draggable={false} id="cookie-image" src={require(".//images/cookie.png")}/>
            </div>
        </div>
    );

}

export default Cookie; 