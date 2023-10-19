require("dotenv").config();
const express = require('express');
const app = express();


const product = require('./routes/product');
const coupons = require('./routes/coupons');
const bill = require('./routes/bill');
const port = process.env.PORT || 5000;

app.use('/api/products', product);
app.use('/api/coupons', coupons);
app.use('/api/bill', bill);



app.get('/products', (req, res) => {

    res.sendFile(__dirname + '/index2.html');
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});