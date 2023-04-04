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
            //$('.alert').alert()
            window.alert("All new entries must be unique");
            setNewPlayerName("");
            return;
            // we don't want to directely affect the dom
            // document.getElementById("exampleForm.ControlInput1").value = "";
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

            <p className='text-success mt-5'>Add Players</p>

            {/* see CheckApiExample for green coloring, but it doesn't like type
            https://react-bootstrap.github.io/forms/checks-radios/ */}
            {/* exmaple for customizing 
            https://create-react-app.dev/docs/adding-bootstrap/#using-a-custom-theme */}
            <div id="listResults" className="d-flex px-3">
                <Form>
                    {
                        chosenPlayers.map(x => (
                            <>
                                <Form.Check
                                    key={x.name}
                                    className='mt-2 custom custom-control-input'
                                    label={x.name}
                                    checked={x.checked}
                                    //e for event
                                    onChange={() => togglePlayer(x.name)}
                                    id={`checkbox-${x.name}`}
                                    type="checkbox"
                                />

                                {/* <label 
                                    className="btn btn-outline-success" 
                                >
                                    <input 
                                        type="checkbox" 
                                        className="btn-check"
                                        checked={x.checked}
                                        //e for event
                                        onChange={() => togglePlayer(x.name)}
                                    ></input>
                                    {x.name}
                                </label> */}

                            </>
                        ))
                    }
                </Form>
            </div>

            <>
                <Form className="inline px-3">
                    <Form.Group className="mt-5 mb-3" controlId="exampleForm.ControlInput1">
                        <Row className="align-items-center">
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter new player name"
                                    value={newPlayerName}
                                    onChange={(e) => setNewPlayerName(e.target.value)}
                                />
                                {/* This is a sample dismissable fade show alert */}
                                {/* <div className="alert alert-secondary alert-dismissible fade show p-1" role="alert">
                                    <strong>This name is already entered!</strong>
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div> */}
                            </Col>
                            <Col xs="auto">
                                <Button
                                    variant="outline-success"
                                    type="submit"
                                    onClick={validateAndAddNewPlayer}
                                >
                                    Add New Player
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </>
        </div>

    );

};