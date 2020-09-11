require('dotenv/config')
// Memanggil express
const express = require('express')
const server = express()
// Import package body-parser
const bodyParser = require('body-parser')
// Import package morgan 
const morgan = require('morgan')
// Import file main.js di folder src
const routes = require ('./src/main')
// Import file Databases.js
const database = require('./src/config/Databases')
// Menajalankan menggunakan port
const port = 4500
// Import cors library
const cors = require("cors")
// Import redis dari folder config di file redis
const redis = require("./src/Config/redis")


server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(morgan("dev"))
server.use(routes)
server.use(cors())
// app.use(cors())


database
    .connect()
    .then(result => {
        console.log("Database connected")
    })
    .catch(err => {
        console.log("Database not Connected")
    })

redis.redisChek()
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })

server.listen(port, () => {
    console.log(`Service running on port ${port}`)
})

// Membuat method get 
// server.get("/", (req, res) => {
//     res.send("hellow world")
// })

// Megkustom dalam endpoint
// server.get('/sayMyName', (req, res) =>{
//     const nama = req.query.name
//     res.send(`namamu ${nama}`)
// })

// Menggunakan property params
// server.get("/howold/:umur", (req, res) => {
//     const umur = req.params.umur
//     if( umur > 18){
//         res.send("anda sudah dewasa")
//     }else{
//         res.send("anda masih bocah")
//     }
// })