import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const Play = () => {

    const nav = useNavigate();

    return (
        <>
        <h2>Done</h2>
        <p>Some scoring data here</p>
        <Button 
            variant="outline-primary"
            onClick={() => nav(-2)}
        >
            Play
        </Button>
    </>
    );
};