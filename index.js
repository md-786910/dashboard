const express = require("express")
const app = express()
const hbs = require("hbs")
const http = require("http")
const path = require("path")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const server = http.createServer(app)
const port = 3000 || process.env.PORT

dotenv.config({})

//require mongo connection
require("./mongoCon")
// define schema and model
const webSchema = new mongoose.Schema({
    title: String,
    url: String,
    color: String,
    file: String,

})
const webModel = new mongoose.model("webModel", webSchema)
// login
const logSchema = new mongoose.Schema({
    email: String,
    password: String,


})
const logModel = new mongoose.model("logModel", logSchema)

// add middleware
app.use(express.urlencoded())
app.use(express.json())

// server static file
app.use(express.static(path.join(__dirname, "public")))

// set hbs engine
app.set("view engine", "hbs")

// routing
app.get("/", async (req, res) => {
    try {
        let data = await webModel.find()
        // console.log(data)
        res.status(200).render("index", {
            data: data
        })
    } catch (error) {
        console.log(error)
    }

})
app.get("/login", async (req, res) => {
    try {

        res.status(200).render("login")
    } catch (error) {
        console.log(error)
    }

})
app.post("/login", async (req, res) => {
    try {
        let email = (req.body.email)
        let password = (req.body.password)
        let saveData = await logModel.findOne({ email: email, password: password })
        if (saveData) {
            res.status(200).render("setting")
        }
        else {
            res.status(404).render("login", {
                error: "only for admin "
            })
        }
    } catch (error) {
        console.log(error)
    }

})
app.get("/setting", async (req, res) => {
    try {
        let data = await webModel.find()
        res.status(200).render("login", {
            data: data,
        })
    } catch (error) {
        console.log(error)
    }

})
app.get("/search", async (req, res) => {
    try {
        let data = await webModel.find()
        res.status(200).render("search")
    } catch (error) {
        console.log(error)
    }

})
app.post("/getResult", async (req, res) => {
    try {
        let search = req.body.search
        let data = await webModel.find({ title: { $regex: search, } })
        console.log(data)
        res.status(200).render("search", {
            data: data,
        })
    } catch (error) {
        console.log(error)
    }

})
app.post("/sendData", async (req, res) => {
    try {
        // let allDoc = req.body
        // let save doc to database
        let saveToDatabase = new webModel(req.body)
        let saveData = await saveToDatabase.save();
        // console.log(saveData)


        // let get data from database
        let data = await webModel.find()
        res.status(200).render("setting", {
            data: data,
        })
    } catch (error) {
        console.log(error)
    }

})

// delete item
app.post("/delete", async (req, res) => {
    try {
        let deleteId = req.body.delete
        let deleteItem = await webModel.findByIdAndDelete(deleteId)

        res.redirect("/setting")
    } catch (error) {
        console.log(error)
    }

})
server.listen(port, () => console.log("app is running at port ", port))