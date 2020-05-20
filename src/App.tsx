import React from 'react';
import Panel from './components/panel'
import './App.css';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { SelectModeRoute } from './routes/select-mode';
import { SocketServiceProvider } from './services/socket.service';
import { StateProvider } from './shared/state-handler';

function App() {
  return (
    <StateProvider>
      <SocketServiceProvider>
        <Router history={createBrowserHistory()}>
          <Route
            exact
            path="/"
            component={SelectModeRoute}
          />
          <Route
            path="/single-player"
            component={() => <Panel mode={'singleplayer'}/>}
          />
          <Route
            path="/multi-player"
            component={() => <Panel mode={'multiplayer'}/>}
          />
        </Router>
      </SocketServiceProvider>
    </StateProvider>
  );
}

export default App;
