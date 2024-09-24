const validator = require("validator");


const validate_login = (req, res, next) => {
    const { email, password } = req.body;
    let msg = "All required fields should be present: name, email, mobile, and image.";
    let status = 0;
    let data = [];
    if (!email || !validator.isEmail(email)) {
      msg = "Invalid or missing email. Please provide a valid email address.";
      return res.status(201).json({ status, message: msg, data });
    }
  
    const passwordRegex =/^[A-Za-z0-9\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      msg = "Password must be at least 8 characters long";
      return res.status(201).json({ status, message: msg, data });
    }
    req.userLoginData = { email, password };
    next();
};



module.exports = {validate_login };

