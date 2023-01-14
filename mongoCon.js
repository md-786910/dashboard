const mongoose = require('mongoose')
const URL = process.env.MONGO_URI
mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected")
}).catch(err => console.log(err));