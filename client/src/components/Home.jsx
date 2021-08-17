import React from"react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, filterByType, filterByCreation } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home (){

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const allPokemons = useSelector((state)=>state.pokemons)
    const allTypes = useSelector((state)=>state.types)

    
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(9)
    const indexOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }




    useEffect(()=>{
        dispatch(getPokemons())
        dispatch(getTypes())
        setLoading(false)
    },[dispatch])

    

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
        dispatch(getTypes());

    }

    function handleFilterTypes(e){
        dispatch(filterByType(e.target.value))
    }
    function handleFilterCreation(e){
        dispatch(filterByCreation(e.target.value))
    }
    
    return loading ? 
    "cargando..." :    
        (
        <div>
            <Link to ="/pokemons">Crear pokemon</Link>
            <h1>CATCH THEM ALL</h1>
            <button onClick={e=> {handleClick(e)}}>
                Volver a cargar los pokemons
            </button>
            <div>
                <select>
                    <option value= "asc_alf">Ascendente alfabetico</option>
                    <option value= "desc_alf">Descendente alfabetico</option>
                </select>
                <select>
                    <option value= "asc_fu">Ascendente por fuerza</option>
                    <option value= "desc_fu">Descendente por fuerza</option>
                </select>
                <select onChange={e => handleFilterTypes(e)} >
                    <option value= "All">Todos</option>
                   { 
                    allTypes?.map(e=>{
                    return(
                        <option value={e.name} key={e.name} >{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</option>
                        )
                    })
                   }
                </select>
                <select onChange={e => handleFilterCreation(e)}>
                    <option value= "All">Todos</option>
                    <option value= "created">Creados</option>
                    <option value= "api">Existentes</option>
                </select>
                <Paginado
                pokemonsPerPage= {pokemonsPerPage}
                allPokemons= {allPokemons?.length}
                paginado= {paginado}
                />
                {
                   currentPokemons?.length > 0 ? currentPokemons?.map(e=>{
                        return(
                            <div key={e.id} >
                                <Link to={"/home/" + e.id}>
                                    <Card name={e.name} image={e.image} types={e.types} />
                                </Link>
                            </div>
                        )
                    }) : "cargando..."
                }
            </div>
        </div>
    )
}