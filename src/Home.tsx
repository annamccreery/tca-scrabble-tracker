import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Home = () => {
    return (
        <>
        <Button variant="outline-primary">Play Scrabble</Button>
        <Card className='mt-3'>
            <Card.Header>
            Leader Board Stats
            </Card.Header>
            <Card.Body>
            Play a game to see your LeaderBoard
            </Card.Body>
        </Card>
        </>
    )
};