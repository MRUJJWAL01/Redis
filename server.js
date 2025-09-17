require("dotenv").config();
const app = require("./src/app");
const { connectChecheService, checheIntance } = require("./src/services/cache.service");
let prot = process.env.Port ||  3000;


connectChecheService();


app.listen(prot,()=>{
    console.log("server started...");
})