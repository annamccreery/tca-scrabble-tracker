import { useNavigate } from 'react-router-dom';
import { getPreviousPlayers, SetupInfo } from './front-end-model'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface SetupProps {
    previousPlayers: string[];
    setSetupInfo: (info: SetupInfo) => void;
}

export const Setup: React.FC<SetupProps> = ({
    previousPlayers
    , setSetupInfo
}) => {

    const nav = useNavigate();

    const [chosenPlayers, setChosenPlayers] = useState(
        previousPlayers.map(x => ({
            name: x
            , checked: false
        }))
    );

    const [newPlayerName, setNewPlayerName] = useState("");

    const validateAndAddNewPlayer = () => {

        //validation
        if (
            newPlayerName.length == 0
            || chosenPlayers.some(x => x.name.localeCompare(newPlayerName) == 0)
        ) {
            alert("Player already exists");
            setNewPlayerName("");
            return;
        }

        setChosenPlayers(
            [
                ...chosenPlayers
                , {
                    name: newPlayerName
                    , checked: true
                }
            ]
        );

        setNewPlayerName("");
    };

    //for the player that has been clicked it will toggle only players that state
    const togglePlayer = (name: string) => setChosenPlayers(
        chosenPlayers.map(x => ({
            ...x
            , checked: x.name == name ? !x.checked : x.checked
        }))
    );

    const startGame = () => {
        setSetupInfo({
            start: new Date().toISOString()
            , chosenPlayers: chosenPlayers
                .filter(x => x.checked)
                .map(x => x.name)
        })
        nav("/play");
    };

    return (
        <div className='bg-light flex-grow-1'>
            <h2>Setup</h2>

            <Button
                variant="success"
                onClick={startGame}
            >
                Start Game
            </Button>

            <p className='d-flex text-success mt-5'><strong>Add Players</strong></p>

            <div id="listResults" className="d-flex px-3">
                <Form>
                {
                    chosenPlayers.map(x =>(
                        <Form.Check
                        >
                            <Form.Check.Input
                                checked={x.checked}
                                onChange={() => togglePlayer(x.name)}
                                className={`${x.checked ? 'bg-success' : 'bg-white'}`}
                            />
                            <Form.Check.Label>
                                {x.name}
                            </Form.Check.Label>
                        </Form.Check>
                    ))
                } 

                </Form>
            </div>

            <>
                <Form className="inline px-3">
                    <Form.Group className="mt-5 mb-1" controlId="exampleForm.ControlInput1">
                        <Row className="align-items-center">
                            <Col xs="auto" className='mt-2'>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter new player name"
                                    value={newPlayerName}
                                    onChange={(e) => setNewPlayerName(e.target.value)}
                                />
                                {/* This is a sample dismissable fade show alert */}
                                {/* <div className="alert alert-danger alert-dismissible fade show p-1" role="alert">
                                    <strong>This name is already entered!</strong>
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div> */}
                            </Col>
                            <Col xs="auto" className='mt-3'>
                                <Button
                                    variant="outline-success"
                                    //type="submit" this was causing a nav error
                                    onClick={validateAndAddNewPlayer}
                                >
                                    Add New Player
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </>
        </div >

    );

};