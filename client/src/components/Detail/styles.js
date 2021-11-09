import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles({
    detailContainer:{
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.301)',
        margin: '0 auto',
        borderRadius: '10px',
        padding: '1rem',
    },
    detailImg:{
        width: '300px',
        height: '300px',
    },
    text:{
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
        fontSize: '25px',
        margin: '0.5rem',
    },
    detailContainer__profile:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailProfileP:{
        textAlign: 'left',
        marginLeft: '1rem',
        fontSize: '17px',
        color: 'white',
        marginBottom: '0.5rem',
    },
    typeContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: '2rem 0',
    },
    types: {
        margin: '0 10px',
        marginTop: '0.5rem',
    },
    typesP:{
        margin: '0',
        color: "whitesmoke",
    },
    typesImg: {
        width: '50px !important',
        height: '50px !important',
    },
});