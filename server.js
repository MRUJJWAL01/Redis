require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db/db");
const { connectChecheService, checheIntance } = require("./src/services/cache.service");
let prot = process.env.Port ||  3000;

connectDB();

connectChecheService();



app.listen(prot,()=>{
    console.log("server started...");
})