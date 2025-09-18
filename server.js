require("dotenv").config();
const connectDB = require("./src/config/db/db");
const   cacheClient  = require("./src/services/cache.service");
let prot = process.env.Port ||  3000;
const app = require("./src/app");

connectDB();

cacheClient.on("connect", () => {
  console.log("Redis connected successfully");
});

cacheClient.on("error", (error) => {
  console.log("error in redis", error);
});






app.listen(prot,()=>{
    console.log("server started...");
})