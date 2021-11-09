import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles({
    homeCards: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.301)',
        margin: '0 auto',
        borderRadius: '10px',
        marginTop: '1rem',
    },
});