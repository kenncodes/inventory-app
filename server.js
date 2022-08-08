console.log("starting server.js")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
app.use(cors());
require("dotenv").config()
const { ObjectId, Double, Int32 } = require("mongodb")

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'online_store'

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log("connected to database")
        db = client.db(dbName);
    })

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

app.get("/", (request, response) => {
   db.collection("products").find().sort({"name": 1}).toArray()
    .then(results => {
        response.render('index.ejs', { products: results})
    })
})

app.get("/products", (request, response) =>{
    db.collection("products").find().sort({"name":1}).toArray()
        .then(results => {
          //  console.log(results);
            response.render('products.ejs', {products: results})
        })
        .catch(error => {
            console.log(error);
        })
})

app.get("/product/:id", (req,res) => {
    console.log(req.params.id);
    db.collection("products").find({"_id": ObjectId(req.params.id)}).toArray()
        .then( results => {
            console.log("hello " + res);
        res.render('product.ejs', {products: results} )
        })
        .catch(error => {
            console.log("no product found");
            
        })
})

app.post("/addProduct", (request, response) => {
    console.log("attempting to add product");
    if(request.body.name.length > 5 ){  
    db.collection("products").insertOne({
        name: request.body.name,
        price: Double(request.body.price),
        quantity: Int32(request.body.quantity),
        category: request.body.category
    })
    .then(result => {
       console.log(result)
       response.redirect("/products");
    
    })
    .catch(error => {
        console.log(error);
       
    })
}else{
    response.redirect("/products")
}
})

const PORT = 3000;
app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port 3000")
})