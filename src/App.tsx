
import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
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

import { saveGameToCloud, loadGamesFromCloud } from './tca-cloud-api';

const App = () => {
  //
  //state hooks
  //
  const [results, setGameResults] = useState<GameResult[]>([]);

  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    start: ""
    , chosenPlayers: []
  });

  const [emailKeyInput, setEmailKeyInput] = useState("");

  const [emailKeySaved, setEmailKeySaved] = useState("");

  //
  // useEffect Hook
  //
  useEffect(
    () => {
      //creates async function
      const loadEmailKeyAndGameResults = async() => {
        try {
          const ek = String(await localforage.getItem("emailKey")) ?? "";

          if (ek.length > 0) {
            const resultsFromCloud = await loadGamesFromCloud(
              ek
              , "tca-scrabble-tracker"
            );

            if (!ignore) {
              setGameResults(resultsFromCloud);
            }
          }

          if (!ignore) {
            setEmailKeyInput(ek);
            setEmailKeySaved(ek);
          }
        }
        catch (err) {
          console.error(err);
        }
      }; 

      //calls the async function
      let ignore = false;
      loadEmailKeyAndGameResults(); 
      return () => {
        ignore = true;
      };
    }
    , [emailKeySaved] //this prevents an infinit loop
  );

  //
  // Helper functions
  //
  const addGAmeResult = (r: GameResult) => {
    //saving to cloud
    saveGameToCloud(
      emailKeySaved
      , "tca-scrabble-tracker"
      , r.end
      , r
    );

    //optimistically update the lifted app state
    setGameResults([
      ...results
      , r
    ]);
  };
  

  const saveEmailKey = async () => {
    try {
      await localforage.setItem(
        "emailKey"
        , emailKeyInput
      );

      setEmailKeySaved(emailKeyInput);
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
      <Form.Group className="col-md-3 my-4 mx-auto" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="text"
          placeholder="Email"
          value={emailKeyInput}
          onChange={(e) => setEmailKeyInput(e.target.value)}
          className='mb-2'
        />

        <Button
          variant="outline-success"
          onClick={saveEmailKey}
          className='mb-4'
        >
          Save Email
        </Button>
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
