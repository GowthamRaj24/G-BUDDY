const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024
    } });

const addProduct = require("../controllers/products/addProduct.js");
const fetchProduct = require("../controllers/products/fetchProduct.js");
const deleteProduct = require("../controllers/products/deleteProduct.js");
const middleware = require("../middleware/auth");
const routes = express.Router();

routes
    .post("/addProduct",upload.array('images', 5), addProduct.addProduct)
    .get("/getProductsByCategory/:category",fetchProduct.getProductsByCategory)
    .get("/fetchProduct",fetchProduct.getAllProducts)
    .get("/getProduct/:id",fetchProduct.getProductById)
    .get("/fetchProductBySeller/:sellerId", fetchProduct.getProductsBySeller)
    .delete("/deleteProduct/:id", deleteProduct.deleteProduct);

exports.route = routes;
