import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult, SetupInfo } from './front-end-model';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                setupInfo.chosenPlayers.map(x => (
                    <InputGroup className="mb-3">
                        <Button
                            variant="outline-success"
                            className="w-50"
                            onClick={() => endGame(x)}
                        >
                            {x} Won
                        </Button>
                        <Form.Control
                            className="text-center"
                            type="number"
                            placeholder="Current Score"
                        />
                        <Form.Control
                            className="text-center"
                            type="number"
                            placeholder="Total Score"
                        />
                    </InputGroup>

                ))
            }

        </Stack>
    </div>
    );
};