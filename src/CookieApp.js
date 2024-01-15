import './App.css';
import Cookie from './cookie';
import CookieProducer from './CookieProducer';
import { useState } from 'react';

function CookieApp() {
  const [CookieCount, setCookie] = useState(0);
  const [CookiesPerSecond, setCookiesPerSecond] = useState(0);

  return (
    <div id="column-wrapper">
      <div id="cookie-box">
        <Cookie NumCookies={CookieCount} CookieIncrease={setCookie} CPS={CookiesPerSecond}></Cookie>
      </div>
      <div id="upgrade-box">
        <CookieProducer NumCookies={CookieCount} CookieDecrease={setCookie} ></CookieProducer>
      </div>
    </div>
  );
}

export default CookieApp;
