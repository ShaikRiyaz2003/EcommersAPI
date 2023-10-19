const data = require('../dataBase/coupons');
const validator = require('../helpers/couponValidators');
const statusCodes = require('../statusCodes');


const getAllCoupons = async (req, res) => {
    try {
        const coupons = data;
        res.status(200).json(coupons);
    } catch (error) {
        next(error);
    }
}

const addCoupons = async (req, res) => {
    try {
        // todo
    } catch (error) {
        next(error);
    }
}

const removeCoupons = async (req, res) => {
    try {
        // todo
    } catch (error) {
        next(error);
    }
}

const updateCoupons = async (req, res) => {
    try {
        //  todo
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCoupons,
    addCoupons,
    removeCoupons,
    updateCoupons
}