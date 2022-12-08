require("dotenv").config();


const mongo_url = process.env.NODE_ENV === 'test' 
    ? process.env.TEST_MONGO_URI 
    : process.env.MONGODB_URI;
    
const port = process.env.PORT;

module.exports = {
    mongo_url, port
}