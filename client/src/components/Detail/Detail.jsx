import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import { useStyles } from './styles';

export default function Detail(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detail);
  console.log(myPokemon);
  return (
    <div className={classes.detailContainer}>
      {myPokemon ? (
        <>
          <h1 style={{ textTransform: "capitalize" }} className={classes.text}>
            {myPokemon.name}
          </h1>
          <div className={classes.detailContainer__profile}>
            <img className={classes.detailImg} src={myPokemon.image} alt="" />
            <div>
              <p className={classes.detailProfileP}>Healthpoints: {myPokemon.healthpoints}</p>
              <p className={classes.detailProfileP}>Attack: {myPokemon.attack}</p>
              <p className={classes.detailProfileP}>Defense: {myPokemon.defense}</p>
              <p className={classes.detailProfileP}>Speed: {myPokemon.speed}</p>
              <p className={classes.detailProfileP}>Height: {myPokemon.height}</p>
              <p className={classes.detailProfileP}>Weight: {myPokemon.weight}</p>
              <p className={classes.detailProfileP}>ID: {myPokemon.id}</p>
            </div>
          </div>
          <div className={classes.typeContainer}>
            {myPokemon?.types?.map((e, index) => {
              return (
                <div
                  className={classes.types}
                  style={{ textTransform: "capitalize" }}
                  key={index}
                >
                  <img className={classes.typesImg} src={e.image} alt={e.name} />
                  <p className={classes.typesP}> {e.name} </p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Link className="link" to="/home">
        Volver
      </Link>
    </div>
  );
}
