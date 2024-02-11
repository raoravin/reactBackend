import {check} from "express-validator";


export const registerRules = [
    check("name", "Name is Required").notEmpty().trim().escape(),
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("password", "Password should be 6 or more characters").isLength({min:6}),
    check("age", "Age is required").notEmpty().trim().escape().isNumeric(),
    check("terms", "Terms and Condition required").notEmpty().trim().escape(),

];


export const loginRules = [
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("password", "Password should be 6 or more characters").isLength({min:6}),
];


export const updateDetailsRules = [
    check("name", "Name is Required").notEmpty().trim().escape(),
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("age", "Age is required").notEmpty().trim().escape().isNumeric(),
];


export const updatePasswordRules = [
    check("password", "Password should be 6 or more characters").isLength({min:6}),
    check("newPassword", "Password should be 6 or more characters").isLength({min:6}),
];


export const createTodoRules = [
    check("title", "Title is required").notEmpty().trim().escape(),
    check("description", "Description is required").notEmpty().trim().escape(),
    check("completed", "Completed is required").notEmpty().trim().escape().isBoolean(),
]


export const updateTodoRules = [
    check("title", "Title is required").notEmpty().trim().escape(),
    check("description", "Description is required").notEmpty().trim().escape(),
    check("completed", "Completed is required").notEmpty().trim().escape().isBoolean(),
]