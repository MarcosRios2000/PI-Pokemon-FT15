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
import {
  select,
  label
 } from '../../MUIStylesConstants/Constants'
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import { useStyles } from './styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
  const [alf, setAlf] = useState("");
  const [att, setAtt] = useState("");
  const [types, setTypes] = useState("")
  const [creation, setCreation] = useState("")
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
    setTypes(e.target.value)
  }
  function handleFilterCreation(e) {
    dispatch(filterByCreation(e.target.value));
    setCreation(e.target.value);
  }

  function handleSortAlf(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
    setAlf(e.target.value);
  }

  function handleSortAtt(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrden2(`Ordenado ${e.target.value}`);
    setAtt(e.target.value);
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
            <FormControl>
          <InputLabel sx={label} id="demo-simple-select-label">Alf</InputLabel>
          <Select
          onChange={(e) => handleSortAlf(e)}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={alf}
          label="Alf"
          sx={select}
          >
            <MenuItem value={"asc_alf"}>Ascendente</MenuItem>
            <MenuItem value={"desc_alf"}>Descendente</MenuItem>
          </Select>
          </FormControl>
          <FormControl>
          <InputLabel sx={label} id="demo-simple-select-label">Attack</InputLabel>
          <Select
          onChange={(e) => handleSortAtt(e)}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={att}
          label="Att"
          sx={select}
          >
            <MenuItem value={"asc_fu"}>Ascendente</MenuItem>
            <MenuItem value={"desc_fu"}>Descendente</MenuItem>
          </Select>
          </FormControl>
          <FormControl>
          <InputLabel sx={label} id="demo-simple-select-label">Types</InputLabel>
          <Select
          onChange={(e) => handleFilterTypes(e)}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={types}
          label="Types"
          sx={select}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {allTypes?.map((e) => {
              return (
                <MenuItem value={e.name} key={e.name}>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</MenuItem>
              );
            })}
            
          </Select>
          </FormControl>
          <FormControl>
          <InputLabel sx={label} id="demo-simple-select-label">Creation</InputLabel>
          <Select
          onChange={(e) => handleFilterCreation(e)}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={creation}
          label="Creation"
          sx={select}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"created"}>Created</MenuItem>
            <MenuItem value={"api"}>Existant</MenuItem>
          </Select>
          </FormControl>
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
