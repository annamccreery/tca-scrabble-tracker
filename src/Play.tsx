import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult } from './front-end-model';

interface PlayProps {
    addGAmeResultFunc: (r: GameResult) => void;
};

export const Play: React.FC<PlayProps> = ({addGAmeResultFunc}) => {

    const nav = useNavigate();

    const endGame = () =>{
        addGAmeResultFunc({
            winner: "Larry"
            , players: ["Larry", "Curly", "Moe"]
        });

        nav(-2);
    };
    return (
        <>
        <h2>Done</h2>
        <p>Some scoring data here</p>
        <Button 
            variant="outline-primary"
            onClick={endGame}
        >
            Play
        </Button>
    </>
    );
};