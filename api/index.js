const server = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync({ force: true })
.then(() => {
  server.listen(3001, () => {
    console.log('listening port 3001'); 
  });
})
.catch(()=>{
  console.log("Couldn't sync with Database")
})
