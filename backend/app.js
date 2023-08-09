const Express = require("express")

const app = Express();
app.use(Express.json())

const authRouter = require('./router/authRoute.js');
app.use("/api/auth",authRouter)
app.use("/",(req,res)=>{
res.status(200).json({
    data:"jwtauth server"
});
})
module.exports = app;