import "./PokemonCreate.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes, reloadPokemons } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  name: "",
  image: "",
  healthpoints: null,
  attack: null,
  defense: null,
  speed: null,
  height: null,
  weight: null,
  types: [],
};

export default function CharacterCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [error, setError] = useState(initialState);
  const [input, setInput] = useState(initialState);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const validateInput = function (e) {
    let { name } = e.target;
    let numerics = [
      "healthpoints",
      "attack",
      "defense",
      "speed",
      "height",
      "weight",
    ];
    let isNumber = (input) => (typeof input === "number" ? true : false);
    let onlyLeters = new RegExp("/^[A-Z]+$/i");
    if (name === "name") {
      if (!/^[A-Z]+$/i.test(e.target.value)) {
        setError({ ...error, [name]: "Must only contain letters" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
    if (name === "image") {
      if (!e.target.value) {
        setError({ ...error, [name]: "Debe haber una imagen" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
    if (numerics.includes(name)) {
      if (!/^([0-9])*$/.test(e.target.value)) {
        setError({ ...error, [name]: "Stats must only contain numbers" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
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
    <div className="container"> 
      <div className="formContainer">
      <Link className="link" to="/home">
        Return
      </Link>
      <h1 style={{ color: "white" }}>Create your Pokémon</h1>
      <div className="inputs">
        <div className="divForm">
      <form onSubmit={handleSubmit}>
        <div className={`inputContainer ${error.name ? "danger" : ""}`}>
          <div className="formTitle">
          <label>Name</label>
          <label className="error">{error?.name}</label>
          </div>
          <input
            onChange={(e) => {
              handleInputChange(e);
              validateInput(e);
            }}
            type="text"
            name="name"
            value={input.name}
            className={error && "danger"}
          />
        </div>
        {/* <div className={`inputContainer ${error.image ? "danger" : ""}`}>
          <label>Image:</label>
          <input
            onChange={(e) => {
              handleInputChange(e);
              validateInput(e);
            }}
            type="text"
            name="image"
            value={input.image}
            className={error.image && "danger"}
          />
          <span className="error">{error?.image}</span>
        </div> */}
        <div className={`inputContainer ${error.healthpoints ? "danger" : ""}`}>
          <label>Healthpoints</label>
          <span className="error">{error?.healthpoints}</span>
          <input
            onChange={(e) => {
              handleInputChange(e);
              validateInput(e);
            }}
            type="text"
            name="healthpoints"
            value={input.healthpoints}
          />
        </div>
        <div className={`inputContainer ${error.attack ? "danger" : ""}`}>
          <label>Attack</label>
          <span className="error">{error?.attack}</span>
          <input
            onChange={(e) => {
              handleInputChange(e);
              validateInput(e);
            }}
            type="text"
            name="attack"
            value={input.attack}
          />
        </div>
        <div className={`inputContainer ${error.defense ? "danger" : ""}`}>
          <label>Defense</label>
          <input
            onChange={(e) => {
              handleInputChange(e);
              validateInput(e);
            }}
            type="text"
            name="defense"
            value={input.defense}
          />
          <span className="error">{error?.defense}</span>
        </div>
        <div className={`inputContainer ${error.speed ? "danger" : ""}`}>
          <label>Speed</label>
          <span className="error">{error?.speed}</span>
          <input
            onChange={(e) => {
              handleInputChange(e);
              validateInput(e);
            }}
            type="text"
            name="speed"
            value={input.speed}
          />
        </div>
        <div className={`inputContainer ${error.height ? "danger" : ""}`}>
          <label>Height</label>
          <span className="error">{error?.height}</span>
          <input
            onChange={(e) => {
              handleInputChange(e);
              validateInput(e);
            }}
            type="text"
            name="height"
            value={input.height}
          />
        </div>
        <div className={`inputContainer ${error.weight ? "danger" : ""}`}>
          <label>Weight</label>
          <span className="error">{error?.weight}</span>
          <input
            onChange={(e) => {
              handleInputChange(e);
              validateInput(e);
            }}
            type="text"
            name="weight"
            value={input.weight}
          />
        </div>
        <div className="contentSelect">
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
      </form>
      </div>
      <div className="dropbox">x</div>
      </div> 
        <button className="button" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}
