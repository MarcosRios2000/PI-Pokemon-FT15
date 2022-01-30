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
    <div className="searchContainer">
      <input
        className="searchInput"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
        id="busqueda"
      />
      <button className="searchButton" type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
