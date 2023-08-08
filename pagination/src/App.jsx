import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Client from './pages/pagination/client/Client';
import Server from './pages/pagination/server/Server';

function App() {
  const [buttonTitle, setButtonTitle] = useState("client");

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div onClick={(e) => e.target.title && setButtonTitle(e.target.title)} className="button__wrapper">
        <button className={buttonTitle === 'client' ? 'button__highlight' : ''} title="client">Data Modified - Client</button>
        <button className={buttonTitle === 'server' ? 'button__highlight' : ''} title="server">Data fetched - Server</button>
      </div>
      {buttonTitle === 'client' ? <Client /> : <Server />}
    </>
  )
}


export default App
