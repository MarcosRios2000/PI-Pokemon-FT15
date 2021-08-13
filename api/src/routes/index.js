const { Router } = require('express');
const { requestPokemons, getAllPokemons, getPokemonById, getPokemonByName, addPokemon } = require('../controllers/pokemons.js')
const { updateTypes, dbTypes, APITypes } = require('../controllers/types.js')

const router = Router();

updateTypes(); // Lo pongo acá por 2 razones. 
// 1 - Es improbable que agreguen mas tipos de pokemon. 
// 2 - Para cargar 1 sola vez los tipos en la db. Si no, tendria que cargarlos antes que cada funcion o andar chequeando si fueron o no cargados ya. 

//Funciona 
router.get('/pokemons', async function (req, res, next){    
    if (!req.query.name){
        const DB_Pokemons = await getAllPokemons(req, res, next);
        const API_Pokemons = await requestPokemons(req, res, next);
        const answer = { API_Pokemons, DB_Pokemons }
        res.send(answer);
    }
    else {getPokemonByName(req,res,next);}
}) 

router.post('/pokemons', addPokemon)                    //Funciona
router.get('/pokemons/:id', getPokemonById)             //Funciona
router.get('/types', dbTypes)                           //Funciona
router.get('/types/:id', APITypes)                      //Funciona
router.get("/error", function(req, res){                //Funciona
    res.send("Cannot be Found!")
})
router.get("*", function(req, res){                     //Funciona
    res.redirect("/error")
})

module.exports = router;