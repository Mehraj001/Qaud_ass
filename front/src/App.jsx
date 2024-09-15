
import React ,{useState,useEffect} from 'react';
import './App.css'; 
import { Link } from 'react-router-dom';
function App() {
   const [tickers,setTickers]=useState([]);

   useEffect(()=>{
    fetch('http://localhost:3000/get-data').then((response)=>response.json()).then((data)=>setTickers(data.data)).catch((err)=>console.error(err));
   },[]);

   const [darkMode, setDarkMode] = useState(false);


  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
      
    <div className="container">
      <div className={darkMode ? 'app light-mode' : 'app dark-mode'}>


     <header>
     <nav class="navbar">
            <div className='blue' >
              <h1>HODLINFO</h1>
            </div>
            <ul class="nav-links">
            <select id="Contry">
              <option value="inr">INR</option>
             </select>
             <select id="Contry">
              <option value="btc">BTC</option>
              <option value="eth">ETH</option>
              <option value="usdt">USDT</option>
              <option value="trx">TRX</option>
              <option value="dash">DASH</option>
              <option value="zec">ZEC</option>
              <option value="xem">XEM</option>
              <option value="xrp">XRP</option>
              <option value="iost">IOST</option>
              <option value="win">WIN</option>
              <option value="bit">BIT</option>
              <option value="auwrxdi">WRX</option>
             </select>
             <li className="buy-btc">
              <Link to="https://wazirx.com/signup">BUY BTC</Link>
            </li>
            <li className="connect-telegram">
             <Link to="https://telegram.org/">Connect Telegram</Link>
            </li>
            </ul>
            <button onClick={toggleTheme} className="theme-button">
               {darkMode ? 'Dark' : 'Light'} Mode
          </button>
        </nav>
     </header>
      <div className="header">
        <div className="market-info">
          <div className="5-min">
          <span className='blue'>0.1%</span>
          <span className='black'>5 Mins</span>
          </div>
          <div className="1-hour">
          <span className='blue'>0.96%</span>
          <span className='black'>1 Hour</span>
          </div>
         <div className="best-day">
         <span className='black'>Best Price to Trade</span>
         <span className='left'> ₹ 26,56,110</span>
         </div>
          
         <div className="1-day">
         <span className='blue'>2.73%</span>
         <span className='black'>1 day</span>
         </div>
          <div className="7day">
          <span className='blue'>7.51%</span>
          <span className='black'>7 days</span>
          </div>
        </div>
      </div>
      <div className="table">
        <div className="table-header">
          <span>#</span>
          <span>Platform</span>
          <span>Last Traded Price</span>
          <span>Buy / Sell Price</span>
          <span>Volume</span>
          <span>Base Unit</span>
        </div>
        {
        tickers.map((platform, index) => (
          <div className="table-row" key={index}>
            <span>{index + 1}</span>
            <span>{platform.name}</span>
            <span>{platform.last}</span>
            <span>{platform.buy} / {platform.sell}</span>
            <span className={platform.differenceClass}>{platform.volume}</span>
            <span className={platform.savingsClass}>{platform.base_unit}</span>
          </div>
        ))
        }
      </div>
    </div>
    </div>
  );
}

export default App
