import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles({
    paginacion: {
        margin: '15px 0',
    },
    paginacionUl: {
        listStyle: 'none',
        textAlign: 'center',
    },
    paginacionLi: {
        display: 'inline-block',
        marginRight: '5px',
    },
    paginacionA: {
        display: 'block',
        padding: '4px 10px',
        color: 'rgb(0, 0, 0)',
        background: 'transparent',
        borderColor: 'black',
        textDecoration: 'none',
        borderRadius: '8px',
        '&:hover': {
            background: 'white',
            color: 'black',
         }
    },
});