import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult, SetupInfo } from './front-end-model';
import Stack from 'react-bootstrap/Stack';

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
            <p className="text-success mt-5">Select the winner!</p>
            <Stack gap={4} className="col-md-3 mx-auto">

                {
                    setupInfo.chosenPlayers.map(x => (
                        <Button
                            variant="outline-success"
                            onClick={() => endGame(x)}
                        >
                            {x} Won
                        </Button>
                    ))
                }

                {/* does this need to be an array of chosen players that it iterates through? */}
                {/* <form>
                    <label className="form-group m-3 text-success">Current Score</label>
                    <input type="number" className="border border-success form-control form-rounded"></input>
                </form>

                <button type="submit" className="btn btn-outline-danger mt-5">End Game</button> */}

            </Stack>
        </div>
    );
};