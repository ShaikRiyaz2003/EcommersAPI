const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const cors = require('cors');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

const {makePaymentReceipt, initiatePaymentRequest, verifyPayment} = require('../controllers/billController');

router.post('/', makePaymentReceipt);
router.post('/create-order', initiatePaymentRequest);
router.post('/checkout', verifyPayment);

module.exports = router;