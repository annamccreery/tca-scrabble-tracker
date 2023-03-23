import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult, SetupInfo } from './front-end-model';

interface PlayProps {
    addGAmeResultFunc: (r: GameResult) => void;
    setupInfo: SetupInfo;
};

export const Play: React.FC<PlayProps> = ({
    addGAmeResultFunc
    , setupInfo
}) => {

    console.log(setupInfo);

    const nav = useNavigate();

    const endGame = (winner: string) =>{
        addGAmeResultFunc({
            winner: winner
            , players: setupInfo.chosenPlayers
        });

        nav(-2);
    };
    return (
        <>
        <h2>Play</h2>
        <p>Some scoring data here</p>
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
    </>
    );
};