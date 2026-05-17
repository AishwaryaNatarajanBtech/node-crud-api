export const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.jwt_secret.role !== role) {
            return res.status(403).json({
                message: "Forbidden: You don't have the required role to access this resource"
            });
        }
        next();    //without this, the request will be stuck and won't proceed to the next middleware or route handler
    };
};