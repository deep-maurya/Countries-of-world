const { Router } = require("express");
const OTP = require("../controller/otp");
const { Register } = require("../controller/UserController");
const u_mid = require("../Middleware/User/userMiddleware")
const c_mid = require("../Middleware/common")
const { verify_token } = require("../controller/JWT");
require("dotenv").config()

const UserRouter = Router();

UserRouter.post(
    '/register',
    u_mid.Registration_precheck,
    u_mid.check_duplicate,
    u_mid.send_otp
);

UserRouter.post(
    '/register_otp_verify',
    u_mid.validate_token,
    u_mid.Registration_precheck_OTP,
    Register
)

UserRouter.post(
    '/login',
    c_mid.validate_login,
    u_mid.validate_user
)

UserRouter.post(
    '/forget_password_request',
    u_mid.forget_password_precheck,
    u_mid.is_email_registered,
    u_mid.send_reset_password_link
)

UserRouter.post(
    '/forget_password_verify',
    u_mid.verify_password_link
)

UserRouter.post(
    '/forget_password',
    u_mid.forget_v_link_precheck,
    u_mid.update_password
)

UserRouter.get('/', async(req, res) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).json({ status: 0, message: 'No session token found.' });
    }
    try {
        const decoded =await verify_token(token, process.env.JWT_PRIVATE_KEY);
        res.json({ status: 1, message: 'Session is active', data: [{...decoded}] });
    } catch (error) {
        res.status(401).json({ status: 0, message: 'Invalid or expired token' });
    }
});

UserRouter.get('*',(req,res)=>{
    res.json({status:0,messege:"Invalid Endpoints"})
})

UserRouter.post('*',(req,res)=>{
    res.json({status:0,messege:"Invalid Endpoints"})
})

UserRouter.patch('*',(req,res)=>{
    res.json({status:0,messege:"Invalid Endpoints"})
})

UserRouter.put('*',(req,res)=>{
    res.json({status:0,messege:"Invalid Endpoints"})
})

UserRouter.delete('*',(req,res)=>{
    res.json({status:0,messege:"Invalid Endpoints"})
})


module.exports = {UserRouter}