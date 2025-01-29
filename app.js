const express = require('express');
const cors = require('cors');
const productRouter = require('./src/router/productRouter');
const userRouter = require('./src/router/userRouter');

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


// white list kullanımı
app.use(cors({
    origin: '*',
}))


app.use('/api/health-check', (req, res) => {
    return res.status(200).json({
        message: "GoIT Backend Eğitimi",
        version: "1.0.0"
    })
})

// DTO : Data Transfer Object
app.use('/api/product', productRouter)
app.use('/api/auth', userRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

