
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import localforage from 'localforage';

import { Home } from './Home';
import { Play } from './Play';
import { Setup } from './Setup'

import {
  HashRouter
  , Routes
  , Route
} from 'react-router-dom';

import {
  GameResult
  , calculateLeaderboard
  , SetupInfo
  , getPreviousPlayers
  , getShortestGameDuration
  , getLongestGameDuration
  , getAverageGameDurationByPlayerCount
} from './front-end-model';

const hardcodedGameResults: GameResult[] = [
  {
    winner: "Tom"
    , players: ["Tom", "Taylor"]
    , start: "2023-03-24T17:26:05.893Z"
    , end: "2023-03-24T17:28:05.893Z"
  }
  , {
    winner: "Taylor"
    , players: ["Jack", "Taylor"]
    , start: "2023-03-24T17:26:05.893Z"
    , end: "2023-03-24T17:29:05.893Z"
  }
  , {
    winner: "Taylor"
    , players: ["Tom", "Taylor", "Jack"]
    , start: "2023-03-24T17:26:05.893Z"
    , end: "2023-03-24T17:29:05.893Z"
  }
  , {
    winner: "X"
    , players: ["X", "Joe"]
    , start: "2023-03-24T17:26:05.893Z"
    , end: "2023-03-24T17:29:05.893Z"
  }
  , {
    winner: "X"
    , players: ["X", "Joe"]
    , start: "2023-03-24T17:26:05.893Z"
    , end: "2023-03-24T17:29:05.893Z"
  }
  , {
    winner: "Joe"
    , players: ["X", "Joe"]
    , start: "2023-03-24T17:26:05.893Z"
    , end: "2023-03-24T17:29:05.893Z"
  }
  , {
    winner: "Jack"
    , players: ["X", "Joe", "Jack"]
    , start: "2023-03-24T17:26:05.893Z"
    , end: "2023-03-24T17:45:05.893Z"
  }
];

const App = () => {
  //
  //state hooks
  //
  const [results, setGameResults] = useState(hardcodedGameResults);

  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    start: ""
    , chosenPlayers: []
  });

  const [emailKey, setEmailKey] = useState("");

  //
  // Helper functions
  //
  const addGAmeResult = (r: GameResult) => {
    setGameResults([
      ...results
      , r
    ]);
  };

  const saveEmailKey = async() => {
    try { 
      await localforage.setItem(
        "emailKey"
        , emailKey
      );  
    }
    catch (err) {
      console.error(err);
    }
  };

  //
  //JSX
  //
  return (
    <div className="App m-3">
      <h1>TCA Scrabble Tracker</h1>
      <h2>Companion App</h2>
      <Form.Group className="mt-5 mb-3" controlId="exampleForm.ControlInput1">
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Email"
              value={emailKey}
              onChange={(e) => setEmailKey(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-success"
              //type="submit" this was causing a nav error
              onClick={saveEmailKey}
            >
              Save Email
            </Button>
          </Col>
        </Row>
      </Form.Group>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                leaderboardData={calculateLeaderboard(results)}
                shortestGameDuration={getShortestGameDuration(results)}
                longestGameDuration={getLongestGameDuration(results)}
                averageGameDurationData={getAverageGameDurationByPlayerCount(results)}

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
                addGameResultFunc={addGAmeResult}
                setupInfo={setupInfo}
              />
            }
          />
        </Routes>
      </HashRouter>

      <footer className='text-center mt-3'>
        <p>
          <FontAwesomeIcon icon={faLeaf} color="green" className='me-2' />
          Designed By: Anna McCreery Copyright &copy; 2023
        </p>
      </footer>
    </div>
  );
}

export default App;
