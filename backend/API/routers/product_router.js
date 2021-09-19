const express = require('express');
const productController = require('../controllers/product_controller');
const productRouter = express.Router();


productRouter.post('/add', productController.addProduct);
productRouter.post('/delete', productController.deleteProduct);
productRouter.get('/list', productController.getProduct);
module.exports = productRouter;