const initialState = {
    pokemons : [], 
    allPokemons : []
}

function rootReducer (state=initialState, action){
    switch(action.type){
        case "GET_POKEMONS": 
        return{
            ...state,
            pokemons: action.payload,
            allPokemons : action.payload
        }
        case "GET_TYPES": 
        return{
            ...state,
            types: action.payload
        }
        case "FILTER_BY_TYPE":
        const allPokemons = state.allPokemons
        const typeFiltered = action.payload === "All" ? allPokemons : allPokemons.filter(el => (el.types.filter(el => el.name === action.payload)).length > 0)
        return{
            ...state,
            pokemons: typeFiltered
        }
        case "FILTER_BT_CREATION":
        const allPokemons2 = state.allPokemons 
        const creationFiltered = allPokemons2
        return{
            ...state,
            pokemons: creationFiltered
        }
        default: 
            return state;
    }

        // const typesEach = types?.map(el=>{
        //     for(let i=0; i<el.length; i++) return el[i]
        // })
        // types?.map(el=>{
        //     for(let i=0; i<el.length; i++) el[i].filter(el=>el === action.payload)
        // })
        // .filter(el => el.types.map(el=>el.name).map(el=>{
        //     for(let i=0; i<el.length; i++) el[i] 
        // })) 
        // ?.filter(el => el.types?.map(el=>el?.includes(action.payload)))
        //allPokemons.filter(el=>el.name === "bulbasaur")
        // allPokemons.filter(el=>(el.types.forEach(el=>el.name)) === action.payload)
        // .map(el => el.types.map(ele=>ele.name)).map(elem=>{
        //     for(let i=0; i<elem.length; i++) {
        //         elem.includes(action.payload)
        //     }
        // }) 
}




export default rootReducer;