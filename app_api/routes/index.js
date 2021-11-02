var express = require("express");
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'thisSecret',
    userProperty: 'payload',
    algorithms: ['HS256']
});

var ctrlAuth = require('../controllers/authentication');
var ctrlProduct = require('../controllers/commodity');

//product
router.post('/product', ctrlProduct.createProduct);
router.get('/product', ctrlProduct.productByFarmer);
router.get('/allProducts', ctrlProduct.allProducts);
router.get('/product/:productid', ctrlProduct.productReadOne);
router.put('/product/:productid', ctrlProduct.updateProduct);
router.delete('/product/:productid', ctrlProduct.deleteProduct);


//authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/role', ctrlAuth.loginByRole);


module.exports = router;