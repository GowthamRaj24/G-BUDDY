const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    } });

const addProduct = require("../controllers/products/addProduct.js");
const fetchProduct = require("../controllers/products/fetchProduct.js");
const updateProduct = require("../controllers/products/updateProduct.js");
const deleteProduct = require("../controllers/products/deleteProduct.js");
const middleware = require("../middleware/auth")
const routes = express.Router();

routes
    .post("/addProduct", middleware.auth,upload.array('images', 5), addProduct.addProduct)
    .get("/searchProduct", middleware.auth,fetchProduct.searchProduct)
    .get("/fetchProduct", middleware.auth,fetchProduct.getProducts)
    .get("/fetchProduct/:id", middleware.auth,fetchProduct.getProductById)
    .get("/fetchProductBySeller/:sellerId",middleware.auth, fetchProduct.getProductsBySeller)
    .patch("/updateProduct", middleware.auth,updateProduct.updateProduct)
    .delete("/deleteProduct/:id", middleware.auth,deleteProduct.deleteProduct);

exports.route = routes;
