import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles({
    cardContainer:{
        backgroundColor: 'rgba(85, 70, 70, 0.308)',
        borderRadius: '5px',
        width: '80%',
        margin: '0 auto',
        boxShadow: '0px 4px 10px rgba(188, 226, 250, 0.24)',
    }, 
    name: {
        color: 'lavender',
    },
    type: {
        color: 'blanchedalmond',
        fontSize: '18px',
        margin: '0 10px',
        p:{
            margin: '0px',
            marginBottom: '1rem',
        }
    },
    
});