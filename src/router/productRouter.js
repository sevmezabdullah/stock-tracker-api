const productRouter = require('express').Router();

const { createProduct, getAll, updateProduct, deleteProduct } = require('../controller/productController');


productRouter.post('/create', createProduct)
productRouter.get('/getAll', getAll)
productRouter.put('/update', updateProduct)
productRouter.delete('/delete/:id', deleteProduct)


module.exports = productRouter;