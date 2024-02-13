import jwt  from "jsonwebtoken";


const authorize = async (req, res, next) => {

    const userId = req.session.user && req.session.user.user
    console.log(userId);

    if(!userId) {
        return res.status(401).json({
            message: "Not Authorize"
        })
    };

    try {
        req.user = userId;
        next();
    } catch (error) {
       console.log(error.message);
       res.status(500).json({
        errors: "Internal Server Error"
       });
    }
};


export default authorize;