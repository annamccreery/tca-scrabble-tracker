import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult, SetupInfo } from './front-end-model';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

interface PlayProps {
    addGameResultFunc: (r: GameResult) => void;
    setupInfo: SetupInfo;
};

export const Play: React.FC<PlayProps> = ({
    addGameResultFunc
    , setupInfo
}) => {

    console.log(setupInfo);

    const nav = useNavigate();

    const endGame = (winner: string) => {
        addGameResultFunc({
            winner: winner
            , players: setupInfo.chosenPlayers
            , start: setupInfo.start
            , end: new Date().toISOString()
        });

        nav(-2);
    };

    const [playersWithScore, setPlayersWithScore] = useState(
        setupInfo.chosenPlayers.map(x => ({
            name: x
            , totalScore: 0
        }))
    );

    const [playersCurrentScore, setPlayersCurrentScore] = useState(
        setupInfo.chosenPlayers.map(x => ({
            name: x
            , currentScore: 0
        }))
    )

    return (
        <div className='bg-light flex-grow-1'>
            <h2 className='mt-2'>Play</h2>


        <Stack gap={3} className="col-md-9 mx-auto">
            <Form.Group className='d-flex'>
                <p className="text-success mt-5 mb-0 w-50">Select the winner!</p>
                <p className="mt-5 mb-0 w-25">Current Score</p>
                <p className="mt-5 mb-0 w-25">Total Score</p>
            </Form.Group>

            {
                playersWithScore.map(x => (
                    <InputGroup className="mb-3">
                        <Button
                            variant="outline-success"
                            className="w-50"
                            onClick={() => endGame(x.name)}
                        >
                            {x.name} Won
                        </Button>
                        <Form.Control
                            className=" ms-3 text-center"
                            type="number"
                            placeholder="Current Score"
                            value={
                                playersCurrentScore.filter(
                                    y => y.name == x.name
                                )[0].currentScore
                            }
                            onChange={
                                (e) => {
                                    setPlayersCurrentScore(
                                    playersCurrentScore.map(y => ({
                                        ...y
                                        , currentScore: y.name == x.name ? Number(e.target.value) : y.currentScore
                                    })))
                                }
                            }
                        />
                        <Button
                            onClick={() => 
                                setPlayersWithScore(
                                    playersWithScore.map(y => ({
                                        ...y 
                                        , totalScore: y.name == x.name 
                                            ?  playersCurrentScore.filter(
                                                z => z.name == y.name
                                                )[0].currentScore + y.totalScore
                                            : y.totalScore
                                    }))
                                )
                            }
                        >
                            Add Score
                        </Button>
                       <span className="ms-5 text-center">{x.totalScore}</span>
                    </InputGroup>

                ))
            }

        </Stack>
    </div>
    );
};