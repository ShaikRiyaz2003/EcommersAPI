const data = require('../dataBase/products');
const validator = require('../helpers/productValidators');
const statusCodes = require('../statusCodes');

const getAllProducts = async (req, res) => {
    try {
        const queryParams = req.query;

        if (Object.keys(queryParams).length === 0) {
            // If no query parameters are provided, return all products
            return res.status(statusCodes.OK.code).json({
                status: statusCodes.OK,
                products: data
            });
        }

        const products = data.filter(product => {
            return Object.entries(queryParams).every(([key, value]) => product[key] == value);
        });

        if (products.length === 0) {
            // If no matching products found, return a 404 status
            return res.status(statusCodes.NO_RESULTS_FOUND.code).json({
                status: statusCodes.NO_RESULTS_FOUND,
                msg: "No products found matching the given criteria.",
            });
        }

        // If matching products found, return them
        res.status(statusCodes.OK.code).json({
            status: statusCodes.OK,
            products: products
        });
    } catch (error) {
        // Handle other errors
        res.status(statusCodes.INTERNAL_SERVER_ERROR.code).json({
            status: statusCodes.INTERNAL_SERVER_ERROR,
            msg: error.message,
        });
    }
};


const addProducts = async (req, res) => {
    try {
        const product = req.body;
        if(validator(product)){
            data.push(product);
            res.status(statusCodes.CREATED.code).json({
                status: statusCodes.CREATED,
                msg: "Product added successfully",
            });
        }else{

        }
        // todo
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR.code).json({
            status: statusCodes.INTERNAL_SERVER_ERROR,
            msg: error.message,
        });
    }
}

const updateProducts = async (req, res) => {
    try {
        const product = req.body;
        
        // todo
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR.code).json({
            status: statusCodes.INTERNAL_SERVER_ERROR,
            msg: error.message,
        });
    }
}


const removeProducts = async (req, res) => {
    try {
        const queryParams = req.query;

        const products = data.filter(product => {
            return Object.entries(queryParams).every(([key, value]) => product[key] == value);
        });

        if (products.length === 0) {
            // If no matching products found, return a 404 status
            return res.status(statusCodes.NO_RESULTS_FOUND.code).json({
                status: statusCodes.NO_RESULTS_FOUND,
                msg: "No products found matching the given criteria.",
            });
        }
        else if(products.length == 1){
            // delete a product from data with producst id
            data.splice(data.indexOf(products[0]),1);
            res.status(statusCodes.OK.code).json({
                status: statusCodes.OK,
                msg: "Product deleted successfully",
            });
        }else{
            res.status(statusCodes.OK.code).json({
                status: statusCodes.OK,
                msg: "More than one product is found please select only one product for removal",
                products: products
            });
        }
        //  todo
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR.code).json({
            status: statusCodes.INTERNAL_SERVER_ERROR,
            msg: error.message,
        });
    }
}

module.exports = {
    getAllProducts,
    addProducts,
    removeProducts,
    updateProducts
}