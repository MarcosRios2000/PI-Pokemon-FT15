import "./Detail.css"
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
    <div >
      {myPokemon ? (
        <div>
          <h1 style={{ textTransform: "capitalize" }} className="types">{myPokemon.name}</h1>
          <img src={myPokemon.image} alt="" width="500px" height="500px" />
          <h2 className="types">Healthpoints:{myPokemon.healthpoints}</h2>
          <h2 className="types">Attack:{myPokemon.attack}</h2>
          <h2 className="types">Defense:{myPokemon.defense}</h2>
          <h2 className="types">Speed:{myPokemon.speed}</h2>
          <h2 className="types">Height:{myPokemon.height}</h2>
          <h2 className="types">Weight:{myPokemon.weight}</h2>
          <h2 className="types">ID:{myPokemon.id}</h2>
          {myPokemon?.types?.map((e, index) => {
            return (
              <div className="types" style={{ textTransform: "capitalize" }}  key={index}>
                <img src={e.image} alt={e.name} width="50px" height="50px" />
                <h2> {e.name} </h2>
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
