
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './Home';
import { Play} from './Play';
import { Setup } from './Setup'

import {
  HashRouter
  , Routes
  , Route,
  Router
} from 'react-router-dom';

import { 
    GameResult
    , calculateLeaderboard,
    SetupInfo,
    getPreviousPlayers
 } from './front-end-model';

const hardcodedGameResults: GameResult[] = [
  {
      winner: "Tom"
      , players: ["Tom", "Taylor"]
  }
  , {
      winner: "Taylor"
      , players: ["Jack", "Taylor"]
  }
  , {
      winner: "Taylor"
      , players: ["Tom", "Taylor", "Jack"]
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
  }
  , {
      winner: "Joe"
      , players: ["X", "Joe"]
  }
  , {
      winner: "Jack"
      , players: ["X", "Joe", "Jack"]
  }
];

const App = () => {

  const [results, setGameResults] = useState(hardcodedGameResults);

  const[setupInfo, setSetupInfo] = useState<SetupInfo>({ 
    start: ""
    , chosenPlayers: []
  });

  const addGAmeResult = (r: GameResult) => {
    setGameResults([
      ...results
      , r
    ]);
  };

  return (
    <div className="App m-3">
      <h1>TCA Scrabble Tracker</h1>
      <h2>Companion App</h2>
      <hr />
      <HashRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                leaderboardData={calculateLeaderboard(results)}
              />
            } 
          />
          <Route 
            path="/setup" 
            element={
              <Setup 
                previousPlayers={getPreviousPlayers(results)}
                setSetupInfo={setSetupInfo}
              />
            } 
          />
          <Route 
            path="/play" 
            element={
              <Play 
                addGAmeResultFunc={addGAmeResult}
                setupInfo={setupInfo}
              />
            } 
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
