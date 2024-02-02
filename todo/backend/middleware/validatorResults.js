import { validationResult } from "express-validator";


export const validateResult = (req, res, next) => {
    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({
    //         message: errors.array()[0].message
    //     });
    // }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    next(); // Proceed to the next middleware or route handler
}