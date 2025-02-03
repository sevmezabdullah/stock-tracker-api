const productRouter = require('express').Router();

const { createProduct, getAll, updateProduct, deleteProduct } = require('../controller/productController');
const { authHandler } = require('../middleware/authHandler');


productRouter.post('/create', createProduct)
productRouter.get('/getAll', authHandler, getAll)
productRouter.put('/update', authHandler, updateProduct)
productRouter.delete('/delete/:id', authHandler, deleteProduct)


module.exports = productRouter;