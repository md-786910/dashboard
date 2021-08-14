const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://db:6O3rHBpJYYLnGjbV@database.l2fnk.mongodb.net/webProject?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    console.log("Connected")
}).catch(err => console.log(err));