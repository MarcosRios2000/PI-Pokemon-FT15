import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detail);
  console.log(myPokemon);
  return (
    <div>
      {myPokemon ? (
        <div>
          <h1 style={{ textTransform: "capitalize" }}>{myPokemon.name}</h1>
          <img src={myPokemon.image} alt="" width="500px" height="500px" />
          <h2>Healthpoints:{myPokemon.healthpoints}</h2>
          <h2>Attack:{myPokemon.attack}</h2>
          <h2>Defense:{myPokemon.defense}</h2>
          <h2>Speed:{myPokemon.speed}</h2>
          <h2>Height:{myPokemon.height}</h2>
          <h2>Weight:{myPokemon.weight}</h2>
          <h2>ID:{myPokemon.id}</h2>
          {myPokemon?.types?.map((e, index) => {
            return (
              <div key={index}>
                <img src={e.image} alt={e.name} width="50px" height="50px" />
                <p> {e.name} </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">Volver</Link>
    </div>
  );
}
