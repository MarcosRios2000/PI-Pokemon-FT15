const server = require('./src/app.js');
const { conn, Type } = require('./src/db.js');
const axios = require('axios')

conn.sync({ force: true })
.then(async () => {
const answer = await axios.get("https://pokeapi.co/api/v2/type/?limit=18");
const data = answer.data.results 
data.forEach(e => {
  return Type.create(e)
});
console.log("Types precargados")
  server.listen(3001, () => {
    console.log('listening port 3001'); 
  });
})
.catch(()=>{
  console.log("Couldn't sync with Database")
})
