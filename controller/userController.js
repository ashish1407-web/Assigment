const userSchema = require('../Schema/userSchema');
const adminSchema = require('../Schema/adminSchema')
const speakeasy = require('speakeasy');
const secret = speakeasy.generateSecret({ length: 20 }).base32;
const registerUser = async function (req, res) {
    try {
        let userDetails = req.body;
        if (!userDetails.name) { return res.status(400).send({ status: false, message: "name is required" }) }

        if (!userDetails.age) { return res.status(400).send({ status: false, message: "age is required" }) }

        if (!userDetails.phoneNumber) { return res.status(400).send({ status: false, message: "phoneNumber is required" }) }

        if (!userDetails.email) { return res.stauts(400).send({ status: false, message: "email is required" }) }

        let bookCreated = await userSchema.create(userDetails)
        return res.status(201).send({ status: true, data: bookCreated })

    } catch (error) {
        console.log(error.message);
    }
}
// Secret key (unique per user)
function generateOTP() {
  return speakeasy.totp({
    secret: secret,
    encoding: 'base32'
  });
}
const LoginUser = async function (req, res) {
    try {
        const { email } = req.body;
        if (!email) { return res.status(400).send({ status: false, message: "email is required for login" }) }
        let adminResgiter = await adminSchema.find({ email: email });
        if (adminResgiter.length > 0) {
            return res.status(200).send({ status: true, msg: 'admin login successfully' });
        } else {
            const otp = generateOTP();
             console.log(otp,email);
            await userSchema.findOneAndUpdate({ email:email},{otp:otp})
            return res.status(201).send({ status: true, msg: "user is login successfully" })
        }
    } catch (err) {
        return res.status(500).send(err.message)
    }
}
const updateAddressByUser=async function(req,res){
try{
    const email=req.query.email;
  const {address}=req.body;
  if (!email) { return res.status(400).send({ status: false, message: "email is required" }) }

  if (!address) { return res.status(400).send({ status: false, message: "address is required" }) }
  console.log("here",email,address)
  await userSchema.findOneAndUpdate({ email:email},{address:address}, { new: true })
  return res.status(201).send({ status: true, msg: "user is updated  successfully" })
}catch(err){
    console.log(err.message)
    return res.status(500).send(err.message)
}
}
module.exports = { registerUser, LoginUser,updateAddressByUser }





