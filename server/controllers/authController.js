
const User = require("../models/User");
const bcrypt = require("bcrypt");

const signup = async(req,res) => {

    try{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message: "All field are required"
        });
    }

    const existinguser = await User.findOne({email});

    if(existinguser){
        return res.status(409).json({
            message: "Email already registered"
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
    })
    } catch(error) {
        console.log("Signup error:",error.message);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = {signup};