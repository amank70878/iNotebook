const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const mongoUrl = 'mongodb://localhost:27017/inotebook'

const connectToMongo = ()=>{
      mongoose.connect(mongoUrl, ()=>{
            console.log("connected!")
      })
}

module.exports= connectToMongo;