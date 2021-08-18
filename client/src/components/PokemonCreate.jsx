import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes, reloadPokemons } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
const initialState = {
  name: "",
  image: "",
  healthpoints: "",
  attack: "",
  defense: "",
  speed: "",
  height: "",
  weight: "",
  types: [],
};

export default function CharacterCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [input, setInput] = useState(initialState);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = function () {
    setInput(initialState);
  };

  const handleSelectTypes = function (e) {
    let type1 = document.getElementById("main-type").value;
    e.target.name === "main-type"
      ? setInput({
          ...input,
          types: [
            {
              name: e.target.value,
              image: `https://typedex.app/types/${e.target.value}.png`,
            },
          ],
        })
      : setInput({
          ...input,
          types: [
            { name: type1, image: `https://typedex.app/types/${type1}.png` },
            {
              name: e.target.value,
              image: `https://typedex.app/types/${e.target.value}.png`,
            },
          ],
        });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    dispatch(reloadPokemons());
    clearForm();
  };

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Creá tu Pokemon </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            onChange={(e) => handleInputChange(e)}
            type="text"
            name="name"
            value={input.name}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            onChange={(e) => handleInputChange(e)}
            type="text"
            name="image"
            value={input.image}
          />
        </div>
        <div>
          <label>Healthpoints:</label>
          <input
            onChange={(e) => handleInputChange(e)}
            type="number"
            name="healthpoints"
            value={input.healthpoints}
          />
        </div>
        <div>
          <label>Attack:</label>
          <input
            onChange={(e) => handleInputChange(e)}
            type="number"
            name="attack"
            value={input.attack}
          />
        </div>
        <div>
          <label>Defense:</label>
          <input
            onChange={(e) => handleInputChange(e)}
            type="number"
            name="defense"
            value={input.defense}
          />
        </div>
        <div>
          <label>Speed:</label>
          <input
            onChange={(e) => handleInputChange(e)}
            type="number"
            name="speed"
            value={input.speed}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            onChange={(e) => handleInputChange(e)}
            type="number"
            name="height"
            value={input.height}
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            onChange={(e) => handleInputChange(e)}
            type="number"
            name="weight"
            value={input.weight}
          />
        </div>
        <div>
          <select
            id="main-type"
            name="main-type"
            onChange={(e) => handleSelectTypes(e)}
          >
            {types?.map((e) => {
              return (
                <option value={e.name} key={e.name}>
                  {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                </option>
              );
            })}
          </select>
          {input.types.length > 0 && (
            <select name="second-type" onChange={(e) => handleSelectTypes(e)}>
              {types?.map((e) => {
                return (
                  <option value={e.name} key={e.name}>
                    {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
