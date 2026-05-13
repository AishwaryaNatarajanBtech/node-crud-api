export const requestTime = (req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();    //without this, the request will be stuck and won't proceed to the next middleware or route handler
};