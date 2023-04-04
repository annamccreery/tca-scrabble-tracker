import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult, SetupInfo } from './front-end-model';

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
            <p>Some scoring data here</p>
            {
                setupInfo.chosenPlayers.map(x => (
                    <Button
                        variant="outline-success"
                        onClick={() => endGame(x)}
                        className="mb-3"
                    >
                        {x} Won
                    </Button>
                ))
            }
        </div>
    );
};