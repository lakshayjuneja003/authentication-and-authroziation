const PORT = process.env.PORT || 5002;
require('dotenv').config()

const app = require("./app.js")

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}...`)
})