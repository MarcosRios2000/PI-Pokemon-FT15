import "./PokemonCreate.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes, reloadPokemons } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  name: "",
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
  const [error, setError] = useState(initialState);
  const [input, setInput] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");

  

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
    // let isNumber = (input) => (typeof input === "number" ? true : false);
    // let onlyLeters = new RegExp("/^[A-Z]+$/i");
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
      if (!/^([0-9])*$/.test(e.target.value) || e.target.value.length === 0) {
        setError({ ...error, [name]: "Stats must be numbers" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
  };

  const clearForm = function () {
    setInput(initialState);
  };

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
    }

    
    setSelectedFile(e.target.files[0])
}

  const handleSelectTypes = function (e) {
    let type1 = document.getElementById("main-type").value;
    e.target.name === "main-type"
      ? setInput({
          ...input,
          types: [
            {
              name: e.target.value,
              image: `/images/Types/type${e.target.value}.png`,
            },
          ],
        })
      : setInput({
          ...input,
          types: [
            { name: type1, image: `/images/Types/type${type1}.png` },
            {
              name: e.target.value,
              image: `/images/Types/type${e.target.value}.png`,
            },
          ],
        });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(postPokemon(input, preview));
    dispatch(reloadPokemons());
    clearForm();
  };
  


  useEffect(() => {
    dispatch(getTypes());
   
  }, []);

  console.log(preview)


  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])

  return (
    <div className="container"> 
      <div className="formContainer">
      <form onSubmit={handleSubmit}>
      <Link className="link" to="/home">
        Return
      </Link>
      <h1 style={{ color: "white" }}>Create your Pokémon</h1>
      <div className="inputs">
        <div className="divForm">
        <div className={`inputContainer ${error.name ? "danger" : ""}`}>
          <div className="formTitle">
          <div>Name</div>
          <div className="error">{error?.name}</div>
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
          <div className="formTitle">
          <div>Healthpoints</div>
          <div className="error">{error?.healthpoints}</div>
          </div>
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
        <div className="formTitle">
          <div>Attack</div>
          <div className="error">{error?.attack}</div>
          </div>
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
        <div className="formTitle">
          <div>Defense</div>
          <div className="error">{error?.defense}</div>
          </div>
          <input
            onChange={(e) => {
              handleInputChange(e);
              validateInput(e);
            }}
            type="text"
            name="defense"
            value={input.defense}
          />
        </div>
        <div className={`inputContainer ${error.speed ? "danger" : ""}`}>
        <div className="formTitle">
          <div>Speed</div>
          <div className="error">{error?.speed}</div>
          </div>
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
        <div className="formTitle">
          <div>Height</div>
          <div className="error">{error?.height}</div>
          </div>
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
        <div className="formTitle">
          <div>Weight</div>
          <div className="error">{error?.weight}</div>
          </div>
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
      </div>
      <div className="dropbox">
        <img src={preview} alt="asdasd" />
      <input onChange={onSelectFile} type="file"/>
    </div>
      </div> 
        <button className={`button ${(error.name
                                    || error.healthpoints
                                    || error.attack
                                    || error.defense
                                    || error.speed
                                    || error.height
                                    || error.weight)
                                    || (input.name.length === 0
                                      || input.healthpoints.length === 0 
                                      || input.attack.length === 0
                                      || input.defense.length === 0
                                      || input.speed.length === 0
                                      || input.height.length === 0
                                      || input.weight.length === 0
                                      || input.types.length === 0
                                        )
                                        ? "buttonDanger" : ""}`} type={`${(error.name
                                          || error.healthpoints
                                          || error.attack
                                          || error.defense
                                          || error.speed
                                          || error.height
                                          || error.weight)
                                          || (input.name.length === 0
                                            || input.healthpoints.length === 0 
                                            || input.attack.length === 0
                                            || input.defense.length === 0
                                            || input.speed.length === 0
                                            || input.height.length === 0
                                            || input.weight.length === 0
                                            || input.types.length === 0
                                              )
                                              ? "button" : "submit"}`}>
          Create
        </button>
                                      </form>
      </div>
    </div>
  );
}


