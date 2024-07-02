const User = require("../models/user.model");
const sgmail = require("@sendgrid/mail");

sgmail.setApiKey();
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:'',
//         pass:''
//     }
// })

const resetpassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  // return;
  const user = await User.findOne({ email: email });
  console.log(user);
  if (user !== null) {
    try {
      const msg = {
        from: "",
        to: `${email}`,
        subject: "Reset Your Password",
        text: `http://localhost:8080/resetpassword/${user._id}`,
      };
      sgmail
        .send(msg)
        .then(() => {
          res.status(200).json({ message: "mail send successfully" });
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json({ message: "mail failed" });
        });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  } else {
    res.status(500).json({ message: "You are not Register" });
  }
};

module.exports = resetpassword;
