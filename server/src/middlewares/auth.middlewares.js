import { verifyAccessToken } from "../utils/auth.utils.js";

export const authenticate = async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if(!accessToken){
        return res.status(401).json({
            message: "Access Token is not found in the request header"
        });
    };

    try {
        const decoded = verifyAccessToken(accessToken);
        const {id} = decoded;
        req.user = id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired access token"
        })
    };
};