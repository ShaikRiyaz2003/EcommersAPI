require("dotenv").config();

const txnData = require('../dataBase/transactions');
const validator = require('../helpers/paymentValidators');
const statusCodes = require('../statusCodes');
const productData = require('../dataBase/products');
const couponData = require('../dataBase/coupons');
const hash = require('object-hash');
const Razorpay = require('razorpay');
const validators = require('../helpers/paymentValidators');


var instance = new Razorpay({
    key_id : process.env.RAZORPAY_ID_KEY,
    key_secret : process.env.RAZORPAY_SECRET_KEY
})

const generatePaymentId = (data) => {
    // hash data
    return hash(data);
}
const getProductByCode = (code) => {
    return productData.find(item => item.code == code);
}

const getCouponByCode = (code) =>{
    return couponData.find(item => item.code == code);
}

/**
 * input: 
 * {
    * {
        * code: 'D001',
        * quantity : '1',
    * },
    * {
        * code: 'D002',
        * quantity : '3',
    * },
    * .......
 * }
 * 
 */
const makePaymentReceipt = async (req, res) => {
    try {
        const order = req.body;
        let coupon;
        if (order.length === 0) {
            return res.status(statusCodes.BAD_REQUEST.code).json({
                status: statusCodes.BAD_REQUEST,
                msg: "Empty order",
            });
        }

const result = order.map(item => {
    let product;

    if (item.code === 'coupon') {
        // Handle coupon logic
        if (coupon !== undefined) {
            throw new Error("Only one coupon can be applied");
        }

        coupon = item;
        return null; // Skip this item in the result array
    } else {
        // Handle regular product logic
        product = getProductByCode(item.code);

        if (!product) {
            throw new Error("Invalid product code found");
        } else if (product.stock_quantity < item.quantity) {
            throw new Error(`Product ${product.code} out of stock`);
        }
    }

    return {
        code: product.code,
        name: product.name,
        image_url: product.image_url,
        quantity: item.quantity,
        unitPrice: product.price,
        totalPrice: product.price * item.quantity,
    };
}).filter(item => item !== null); // Remove null values (skipped coupons) from the result array



        let totalAmount = parseFloat(result.reduce((total, item) => total + item.totalPrice, 0).toFixed(2));
        const AppliedCoupon = getCouponByCode(coupon.value);
        const transaction = {
            order: result,
            totalAmount,
            paymentStatus: 'pending',
        };
        if(AppliedCoupon) {
            totalAmount = totalAmount - (totalAmount * AppliedCoupon.discount)/100;
        }else{
            throw new Error("Invalid coupon code");
        }
        if(transaction.totalAmount != totalAmount){
            transaction.discount = parseFloat((transaction.totalAmount - totalAmount).toFixed(2));
        }
        transaction.paymentId = generatePaymentId(transaction);
        if(coupon && AppliedCoupon){
            transaction.coupon = AppliedCoupon;
        }
        res.status(statusCodes.OK.code).json({
            status: statusCodes.OK,
            msg: "Payment Receipt generated successfully",
            data: transaction,
        });
    } catch (error) {
        res.status(statusCodes.BAD_REQUEST.code).json({
            status: statusCodes.BAD_REQUEST,
            msg: error.message,
        });
    }
};



/**
 * 
 * 
response
{
        "status": {
                "code": 200,
                "description": "OK",
                "details": "The request was successful."
            },
            "msg": "Payment request initiated successfully",
            "data": {
                    "id": "order_Mq7ES2pq3gFNof",
                    "entity": "order",
                    "amount": 500,
                    "amount_paid": 0,
                    "amount_due": 500,
                    "currency": "INR",
                    "receipt": "order_rcptid_11",
                    "offer_id": null,
                    "status": "created",
                    "attempts": 0,
                    "notes": [],
                    "created_at": 1697729461
                }
            }
*/
const initiatePaymentRequest = async (req, res) => {
    const request = req.body;
    try {
        if(!validators.validateRequest(request)){
            throw new Error("Invalid request");
        }
        var options = {
            amount : request.amount,
            currency : request.currency,
            receipt : request.receipt,
        }
        
        instance.orders.create(options, async function(err, order){
            if(err){
                throw new Error("Error in creating order");
            }
            res.status(statusCodes.OK.code).json({
                status: statusCodes.OK,
                msg: "Payment request initiated successfully",
                data: order,
            });
        });
    } catch (error) {
        res.status(statusCodes.BAD_REQUEST.code).json({
            status: statusCodes.BAD_REQUEST,
            msg: error.message,
        });
    }
}

const verifyPayment = async (req, res) => {
    try {
        //  todo
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR.code).json({
            status: statusCodes.INTERNAL_SERVER_ERROR,
            msg: error.message,
        });
    }
}

module.exports = {
    makePaymentReceipt,
    initiatePaymentRequest,
    verifyPayment
}

            