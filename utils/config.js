require("dotenv").config();
const mongo_url = process.env.MONGODB_URI;
const port = process.env.PORT;

module.exports = {
    mongo_url, port
}