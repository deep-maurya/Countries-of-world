const express = require("express")
const cors = require("cors");
const { Dbconnect } = require("./config/DB");
const { UserRouter } = require("./Router/UserRouter");
const cookieParser = require('cookie-parser');
const { verify_token } = require("./controller/JWT");
const { UserModel } = require("./Models/User");


require("dotenv").config();


const PORT = process.env.PORT;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/user',UserRouter)

app.get("/",(req,res)=>{
    res.json({messege:"from server"})
});


app.get('/logout', (req, res) => {
    let msg = 'Logged out successfully';
    const cookieOptions = {
        path: '/',
        httpOnly: false,
        secure: false,
        sameSite: 'Lax'
    };
    const cookieNames = ['auth_token'];
    cookieNames.forEach(cookieName => {
        if (req.cookies[cookieName]) {
            res.clearCookie(cookieName, cookieOptions);
        }
    });
    res.json({ message: msg });
});

app.get('/token_verifys',async(req,res)=>{
    //res.status(200).json({ status: 0, message: 'Invalid token' });
    const token = req.cookies.auth_token;
    console.log(token)
    if(token){
        const data = await verify_token(token);
        if(data.status){
            const uid = data.decode.u_id
            console.log(uid)
            try {
                const user = await UserModel.findById(uid);
                console.log(user)
                if (!user) {
                    return res.status(200).json({ status: 0, message: 'User not found' });
                }
                return res.json({ status: 1, user });
            } catch (error) {
                
            }
        }
    }
    return res.status(200).json({ status: 0, message: 'Invalid token' });
})


app.listen(PORT,(err)=>{
    if (err) {
        console.log(err);
    } else {
        try {
            Dbconnect(process.env.DB_URL)
            console.log(`server is running at port http://localhost:${PORT}`)
        } catch (error) {
            console.log(error)
        }
    }
})