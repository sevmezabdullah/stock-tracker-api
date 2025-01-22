const express = require('express');
const cors = require('cors');
const productRouter = require('./src/router/productRouter');

require('./src/db/db')

require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 4001
app.use(express.json());
app.use(cors({
    origin: '*'
}))


app.use('/api/health-check', (req, res) => {
    return res.status(200).json({
        message: "GoIT Backend Eğitimi",
        version: "1.0.0"
    })
})

app.use('/api/product', productRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

