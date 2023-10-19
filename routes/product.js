const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser');
const cors = require('cors');

const { getAllProducts, addProducts, removeProducts, updateProducts } = require('../controllers/productController');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

router.get('/all', getAllProducts);
router.post('/add', addProducts);
router.delete('/remove', removeProducts);

// will be implemented later
// router.put('/update', updateProducts);



module.exports = router;