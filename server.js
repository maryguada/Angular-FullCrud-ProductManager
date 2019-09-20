// ========== REQUIRE MODULES ============
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('express-flash');
const path = require("path"); 
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Points to the angular file to server the index.html
app.use(express.static(__dirname + '/public/dist/public'));

// =========== LISTEN PORT ==============
app.listen(port, function () {
    console.log("You are listening on port 8000")
})

// ======= MONGOOSE CONNECTION ==========
// Here is where you can change the database information
// from the name to the collections 

mongoose.connect('mongodb://localhost/ProdManagerdb');

// ============= SCHEMA =================
var ProductSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Title must have at least 3 characters"], minlength:3 }, 
    price: {type: Number, required: [true, "Must have price"]},
    url: {type: String, required:[true, "Url Required"]}
}, {timestamps:true})
mongoose.model('Product', ProductSchema); // We are setting this Schema in our Models as Products 

const Product = mongoose.model('Product', ProductSchema)
mongoose.Promise = global.Promise; 

//=========================== ROUTES ============================//
//===============================================================// 

//--------- GET ALL PRODUCTS 
app.get('/products', (req, res) => {
    console.log ("Getting all products!")
    Product.find({}, (err, product) => {
        res.json({message: "Success, Got all Products!", product})
    })
})

//--------- FIND ONE PRODUCT
app.get('/product/:id', (req, res) => {
    console.log("Get one product: " , req.params.id)
    Product.findOne({ _id: req.params.id} , (err, product) => {
        if (err) {
            console.log("Erro message", err)
            res.json(err)
        }else{
            res.json({ message: "Success! Retrieved One Product", product })
        }
    })
})
//---------- CREATE PRODUCT  
app.post('/product/new', (req, res) => {
    console.log(req.body)
    Product.create(req.body, (err, products) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success! Created new product!",
                data: products
            })
        }
    })
})

//--------- EDIT ROUTE 
app.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    }, (err, products) => {
        if (err) {
            console.log("Returned error", err);
            res.json({
                message: "Error",
                error: err
            })
        } else {
            res.json({
                message: "Success edited one product ",
                data: products
            })
        }
    })
})

//--------- DELETE ROUTE 
app.delete('/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success"
            })
        }
    })
})

//--------- 404 Re-Routing 
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });

