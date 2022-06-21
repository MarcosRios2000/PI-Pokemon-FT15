import "./SearchBar.css";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function cleanInput() {
    let i = document.getElementById("busqueda");
    i.value = "";
    //.target.value = ""
  }

  function handleSubmit(e) {
    e.preventDefault();
    cleanInput();
    dispatch(getNamePokemons(name));
  }

  return (
    <div>
      <input
        className="inputSearch"
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleInputChange(e)}
        id="busqueda"
      />
      <button className="buttonSearch" type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
