const mongoose = require("mongoose");
const MONGODB_URL = "mongodb://0.0.0.0/SignIn-Up"
const databseconnect = ()=>{
mongoose
.connect(MONGODB_URL)
.then((conn)=>{console.log(`connected to db :${conn.connection.host}`)})
.catch((err)=>{console.log(err.message)})
}
module.exports = databseconnect;