import './App.css';
import Cookie from './cookie';
import CookieProducer from './CookieProducer';
import { useState, useEffect } from 'react';

function CookieApp() {
  const [CookieCount, setCookie] = useState(0);
  const [CookiesPerSecond, setCookiesPerSecond] = useState(0);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setCookie(CookieCount + CookiesPerSecond);
    }, 1000);
    return () => clearInterval(myInterval); 
  }, [CookieCount, CookiesPerSecond, setCookiesPerSecond]);

  return (
    <div id="column-wrapper">
      <div id="cookie-box">
        <Cookie NumCookies={CookieCount} CookieIncrease={setCookie} CPS={CookiesPerSecond}></Cookie>
      </div>
      <div id="upgrade-box">
        <CookieProducer NumCookies={CookieCount} CookieDecrease={setCookie} CPS={CookiesPerSecond} CPSModify={setCookiesPerSecond}></CookieProducer>
      </div>
    </div>
  );
}

export default CookieApp;
