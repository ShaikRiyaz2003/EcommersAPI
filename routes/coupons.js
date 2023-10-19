const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser');
const cors = require('cors');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());


const {getAllCoupons, addCoupons, removeCoupons, updateCoupons} = require('../controllers/couponController');

router.get('/all', getAllCoupons);
router.get('/add', addCoupons);
router.get('/remove', removeCoupons);
router.get('/update', updateCoupons);



module.exports = router;