export const isAuthenticated =(req,res,next)=>{
    if (req.session.user) {
        next(); // User is authenticated, proceed to the next middleware or route
    } else {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        }); 
    }
}