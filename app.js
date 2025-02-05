const express = require('express');
const cors = require('cors');
const productRouter = require('./src/router/productRouter');
const userRouter = require('./src/router/userRouter');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const { engine } = require('express-handlebars');

require('./src/db/db')

require('dotenv').config()

const app = express();

// 2 adet token vardır.
// refresh token - geçerlilik süresi uzundur. endpointlere erişirken kullanılmaz. 
// - yeni bir access token almak için kullanılır.
// access token - geçerlilik süresi çok kısa. endpointlere erişirken kullanılır.
//- endpointlere erişip veri alışverişinde kullanılır.




const PORT = process.env.PORT || 4001
app.use(express.json());
app.engine('handlebars', engine({
    defaultLayout: false
}));
app.set('view engine', 'handlebars');

// white list kullanımı
app.use(cors({
    origin: '*',
}))

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "GoIT Backend Eğitimi",
            version: "1.0.0",
            description: "GoIT Backend Eğitimi",
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "Dev Server"
            }, {
                url: "https://api.vetmerkez.com",
                description: "Production Server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        email: { type: "string" },
                        password: { type: "string" }
                    },
                    required: ["name", "email", "password"]
                }
            }
        }
    },
    apis: ["./app.js", "./src/router/*.js"]

}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


/**
 * 
 * /api/health-check:
 *   get:
 *     summary: Health Check
 *     description: Health Check
 *     responses:
 *      200:
 *        description: Health Check
 *      400:
 *        description: Kötü istek attın, lütfen kontrol et.
 *      500:
 *        description: Sorun benden kaynaklanıyor. Helal et.
 * 
 */
app.use('/api/health-check', (req, res) => {
    return res.status(500).json({
        message: "GoIT Backend Eğitimi",
        version: "1.0.0"
    })
})

/**
 * @swagger
 * tags:
 *  name: Ürünler
 *  description: Ürün API
 * 
*/
app.use('/api/product', productRouter)

/**
 * @swagger
 * tags:
 *  name: Kullanıcı
 *  description: Kullanıcı API
 */
app.use('/api/auth', userRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

