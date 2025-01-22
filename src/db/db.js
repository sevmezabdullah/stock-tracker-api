const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI, {}).then(() => {
    console.log('Veritabanına Bağlandı');
}).catch((err) => {
    console.log("Veritabanına Bağlanılamadı", err);
});