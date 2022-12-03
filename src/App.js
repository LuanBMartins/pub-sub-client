import React, { useState } from 'react'
import Swal from 'sweetalert2'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Manager from './pages/Manager/Manager';
import Home from './pages/Home/Home';
import Services from './pages/Service/Services';
import Navbar from './Components/Navbar/Navbar';
import useWebSocket from 'react-use-websocket';

const App = (props) => {
  const [notification, setNotification] = useState([])
  const [checked, setChecked] = React.useState([])
  const [desconto, setDesconto] = React.useState(25);
  const [games, setGames] = React.useState([])
  const [price, setPrice] = React.useState(100);
  
  const { sendMessage } = useWebSocket('ws://localhost:3030', {
    onOpen: () => console.log(`Connected to App WS`),
    onMessage: (msg) => {

      if(msg.data !== 'recebido!' 
      && (notification.filter(value => value.id === JSON.parse(msg.data).id).length > 0)
      ){
        return
      }

      if (msg.data !== 'recebido!') {
        const array = notification
        array.push(JSON.parse(msg.data))
        setNotification(array)
        sweetAlert(JSON.parse(msg.data))
      }
    },
    onError: (event) => { console.error(event); },
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000
  });

  const sweetAlert = (game) => {
    Swal.fire({
      title: '<h3>Nova oferta!</h3>',
      icon: 'info',
      html:
        `<b>${game.name}</b> ` +
        `<img src="${game.header_image}"></img>` +
        `Mais informações na sessão de <b>Notificações</b>`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Ok'
    })
  }

  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <Manager 
            sendMessage={sendMessage} 
            checked={checked} 
            setChecked={setChecked} 
            desconto={desconto} 
            setDesconto={setDesconto} 
            price={price}
            setPrice={setPrice}
            games={games}
            setGames={setGames}
            />
          </Route>
          <Route path="/service" exact>
            <Services notifications={notification} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
