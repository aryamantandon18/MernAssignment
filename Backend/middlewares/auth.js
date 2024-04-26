export const isAuthenticated =(req,res,next)=>{
if(req.session.user){
    return next();
}
return res.status(401).json({
    success:false,
    message:"Unauthorized"
})
}