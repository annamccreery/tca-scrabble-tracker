import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { LeaderboardPlayer } from './front-end-model';
import Table from 'react-bootstrap/Table';
import { durationFormatter } from 'human-readable';

interface HomeProps {
    leaderboardData: LeaderboardPlayer[];
    shortestGameDuration: number;
    longestGameDuration: number;
};
export const Home: React.FC<HomeProps> = ({
    leaderboardData
    , shortestGameDuration
    , longestGameDuration
}) => {
    
    console.log(
        leaderboardData
        , shortestGameDuration
        , longestGameDuration
        );

    const nav = useNavigate();

    const format = durationFormatter();

    return (
        <>
            <Button 
                variant="success"
                onClick={() => nav("/setup")}
            >
                Start a Game
            </Button>
            <Card className='mt-3 overflow-hidden'>
                <Card.Header>
                    Leader Board Stats
                </Card.Header>
                <Card.Body>
                    {
                        leaderboardData.length == 0 && 
                        <p>Play a game to see your LeaderBoard... </p>
                    }
                    {
                        leaderboardData.length > 0 &&
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>AVG</th>
                                    <th>PLAYER</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    leaderboardData.map(x => (
                                        <tr>
                                            <td>{x.wins}</td>
                                            <td>{x.losses}</td>
                                            <td>{x.avg}</td>
                                            <td>{x.name}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                      </Table>
                    }
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>
                    Game Time Fun Facts
                </Card.Header>
                <Card.Body>
                    <p>
                        {`${format(shortestGameDuration)} shortest game ever`}
                    </p>
                    <p>
                    {`${format(longestGameDuration)} longest game ever`}
                    </p>
                </Card.Body>
            </Card>
        </>
    )
};