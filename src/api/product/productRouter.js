const productRouter = require('express').Router();

const { createProduct, getAll, updateProduct, deleteProduct } = require('./productController');
const { authHandler } = require('../../middleware/authHandler');



/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Product API
 * 
 * /api/product/create:
 *  post:
 *    summary: Yeni ürün oluşturma
 *    tags: [Product]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              productName:
 *                type: string
 *              country:
 *                type: string
 *              stock:
 *                type: number
 *              expireDate:
 *                type: string
 *              color:
 *                type: string
 *              weight:
 *                type: number
 *            required:
 *              - productName
 *              - stock
 *              - country
 *              - expireDate
 *              - color
 *              - weight
 *    responses:
 *      201:
 *        description: Product created successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */
productRouter.post('/create', createProduct)


/**
 * @swagger
 * /api/product/getAll:
 *  get:
 *    summary: Bütün ürünleri getirir.
 *    tags: [Product]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Products fetched successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */
productRouter.get('/getAll', authHandler, getAll)

/**
 * @swagger
 * /api/product/update:
 *  put:
 *    summary: Güncelleme işlemi için id gönderilir.
 *    tags: [Product]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Product updated successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */
productRouter.put('/update', authHandler, updateProduct)


/**
 * @swagger
 * /api/product/delete/:id:
 *  delete:
 *    summary: Silme işlemi için id gönderilir.
 *    tags: [Product]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Silme işlemi başarılı
 *      400:
 *        description: Hatalı istek
 *      500:
 *        description: Sunucu hatası
 */
productRouter.delete('/delete/:id', authHandler, deleteProduct)



module.exports = productRouter;