import {body, validationResult} from "express-validator";

export const registerValidator = [
    body("name")
        .exists().withMessage("Name is Required").bail()
        .isString().withMessage("Name must be a string").bail()
        .trim()
        .isLength({min:2, max:50}).withMessage("Name must be between 2 to 50 characters"),
    body("email")
        .exists().withMessage("Email is required").bail()
        .trim()
        .isEmail().withMessage("Invalid Email format"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
        .withMessage("Password must be 8+ chars with uppercase, lowercase, number and special character"),
    body("confirmPassword")
        .exists().withMessage("Confirm password is required").bail()
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match"),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid Request Format",
                errors: errors.array()
            })
        }

        next()
    }      
];

export const loginValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .trim()
        .isEmail().withMessage("Invalid Email format"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim()
        .notEmpty().withMessage("Password cannot be empty"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Request Format",
                errors: errors.array()
            });
        }
        next();
    }
];