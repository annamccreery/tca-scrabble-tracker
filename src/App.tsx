import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Home = () => (
  <>
    <h1>TCA Scrabble Tracker</h1>
    <h2>Companion App</h2>
    <Button variant="outline-primary">Play Scrabble</Button>
    <Card>
      <Card.Header>
        LeaderBoard Stat
      </Card.Header>
      <Card.Body>
        Play a game to see your LeaderBoard
      </Card.Body>
    </Card>
  </>
);

function App() {
  return (
    <div className="App">
     <Home />
    </div>
  );
}

export default App;
