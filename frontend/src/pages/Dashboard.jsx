import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Welcome, {user.name}!
            </Typography>
            <Typography variant="body1">
                This is your queue system dashboard. (Placeholder for queue features)
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                    logout();
                    navigate('/login');
                }}
                sx={{ mt: 2 }}
            >
                Sign Out
            </Button>
        </Box>
    );
}