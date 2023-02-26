import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export const Setup = () => {
    
    const nav = useNavigate();

    return (
        <>
            <h2>Setup</h2>
            <Button 
                variant="outline-primary"
                onClick={() => nav("/play")}
            >
                Play
            </Button>
        </>
        
    );
};