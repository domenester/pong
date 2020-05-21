import React from 'react';
import Panel from './components/panel'
import './App.css';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { SelectModeRoute } from './routes/select-mode';
import { SocketServiceProvider } from './services/socket.service';
import { StateProvider } from './shared/state-handler';
import { RoomsRoute } from './routes/rooms';
import Root from './components/root';

function App() {
  return (
    <StateProvider>
      <SocketServiceProvider>
        <Router history={createBrowserHistory()}>
          <Route
            exact
            path="/"
            component={() => 
              <Root
                Component={SelectModeRoute}
              />
            }
          />
          <Route
            path="/single-player"
            component={() => 
              <Root
                Component={Panel}
                props={{mode: 'singleplayer'}}
              />
            }
          />
          <Route
            path="/multi-player"
            component={() => 
              <Root
                Component={Panel}
                props={{mode: 'multiplayer'}}
              />
            }
          />
          <Route
            path="/rooms"
            component={() =>
              <Root
                Component={RoomsRoute}
              />
            }
          />
        </Router>
      </SocketServiceProvider>
    </StateProvider>
  );
}

export default App;
