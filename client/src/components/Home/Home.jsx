import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  filterByType,
  filterByCreation,
  orderByName,
  orderByAttack,
  reloadPokemons,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import { useStyles } from './styles';

export default function Home() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);
  console.log(allTypes, "LINEA 26")

  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState("");
  const [orden2, setOrden2] = useState("");
  const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = Array.isArray(allPokemons)
    ? allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon)
    : allPokemons;
  console.log(currentPokemons);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    setLoading(false);
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    //dispatch(getPokemons());
    dispatch(getTypes());
    dispatch(reloadPokemons());
  }

  function handleFilterTypes(e) {
    dispatch(filterByType(e.target.value));
  }
  function handleFilterCreation(e) {
    dispatch(filterByCreation(e.target.value));
  }

  function handleSortAlf(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortAtt(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrden2(`Ordenado ${e.target.value}`);
  }

  return loading ? (
    <div className="cargando">"Cargando..."</div>
  ) : (
    <div className="Home">
      <div>
        <Link className="link" to="/create">
          Crear pokemon
        </Link>
      </div>
      <h1 className="titulo">POKÉMON</h1>
      <button
        className={classes.boton1}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar los pokemons
      </button>
      <div className="content-select">
        <div>
          <select onChange={(e) => handleSortAlf(e)}>
            <option value="asc_alf">Ascendente alfabetico</option>
            <option value="desc_alf">Descendente alfabetico</option>
          </select>
          <select onChange={(e) => handleSortAtt(e)}>
            <option value="asc_fu">Ascendente por fuerza</option>
            <option value="desc_fu">Descendente por fuerza</option>
          </select>
          <select onChange={(e) => handleFilterTypes(e)}>
            <option value="All">Todos</option>
            {allTypes?.map((e) => {
              return (
                <option value={e.name} key={e.name}>
                  {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                </option>
              );
            })}
          </select>
          <select onChange={(e) => handleFilterCreation(e)}>
            <option value="All">Todos</option>
            <option value="created">Creados</option>
            <option value="api">Existentes</option>
          </select>
        </div>

        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons?.length}
          paginado={paginado}
        />

        <SearchBar />
        <div className={classes.homeCards}>
          {currentPokemons?.length > 0 ? (
            currentPokemons?.map((e) => {
              return (
                <div key={e.id}>
                  <Link to={"/home/" + e.id}>
                    <Card name={e.name} image={e.image} types={e.types} />
                  </Link>
                </div>
              );
            })
          ) : Object.entries(currentPokemons).length !== 0 ? (
            <div key={currentPokemons.id}>
              <Link to={"/home/" + currentPokemons.id}>
                <Card
                  name={currentPokemons.name}
                  image={currentPokemons.image}
                  types={currentPokemons.types}
                />
              </Link>
            </div>
          ) : (
            <div className="cargando">"Cargando..."</div>
          )}
        </div>
      </div>
    </div>
  );
}
