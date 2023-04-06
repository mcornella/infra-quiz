const app = require('./index.js');
const mongoose = require('mongoose');
require('dotenv').config()

const {MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER, NODE_PORT} = process.env;

console.log(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/app?directConnection=true&authSource=admin`)
const mongoURL= `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongodb-statefulset-0.mongodb-service:${MONGO_PORT}/app?directConnection=true&authSource=admin`

console.log(mongoURL);
function connectToDatabase (){
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }).then(() => {
        console.log("Connected to MongoDB");
        app.listen(NODE_PORT, () => {
            console.log(`Server has started on port http://localhost:${NODE_PORT}`);
        })
    }).catch((e) => {
        console.log(`Error while connecting: ${e}`);
        setInterval(connectToDatabase,20000);
    })
}

connectToDatabase();