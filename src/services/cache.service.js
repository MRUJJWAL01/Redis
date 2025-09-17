const redis = require("redis");

const checheIntance = redis.createClient({
    url:process.env.url,

})

const connectChecheService = async()=>{
    try {
        let res = await checheIntance.connect();
        if(res) console.log("redis connection successfully")
        
    } catch (error) {
        console.log(error.message);
        console.log("error in checheservice connection", error );
        
        
        
    }
}

module.exports = {
    connectChecheService,
    checheIntance
};