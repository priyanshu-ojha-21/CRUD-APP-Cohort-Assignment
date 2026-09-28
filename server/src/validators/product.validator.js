import {body, validationResult, param} from "express-validator";

export const productValidator = [
    body("productName")
        .exists().withMessage("Product name is required").bail()
        .trim()
        .isString().withMessage("Product name must be a string").bail()
        .isLength({min: 5, max: 50}).withMessage("Product name must be between 5 to 50 characters"),
    body("productImage")
        .exists().withMessage("Product image is required").bail()
        .isArray({ min: 1 }).withMessage("Product image must be a non-empty array"),
    body("productPrice")
        .exists().withMessage("Product price is required").bail()
        .isNumeric().withMessage("Product price must be a number"),
    body("productStock")
        .exists().withMessage("Product stock is required").bail()
        .isNumeric().withMessage("Product stock must be a number"),
    
    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid request format",
                errors: errors.array()
            })
        };

        next()
    }
    
]

// product.validator.js me add kar
export const idValidator = [
    param("id").isMongoId().withMessage("Invalid product ID"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const updateProductValidator = [
    body("productName")
        .optional()
        .trim()
        .isString().withMessage("Product name must be a string").bail()
        .isLength({min:5, max:50}).withMessage("Product name must be between 5 to 50 characters"),
    body("productImage")
        .optional()
        .isArray({min:1}).withMessage("Product image must be a non-empty array"),
    body("productPrice")
        .optional()
        .isNumeric().withMessage("Product price must be a number"),
    body("productStock")
        .optional()
        .isNumeric().withMessage("Product stock must be a number"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid request format",
                errors: errors.array()
            });
        }
        next();
    }
];