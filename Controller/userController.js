const User = require('../Models/User.js')
const confirmCodeEmail=require('../util/emailService.js')
var jwt = require('jsonwebtoken')
var moment = require('moment')

let privateKey = "123456789"

const userController = {
    register: (req, res) => {
        User.findOne({email:req.body.email}).then((user)=>{
            if(user){
                return res.status(400).json({email:"Email already exists"})
            }else{
                const newUser = new User({
                    email:req.body.email,
                    password:req.body.password,
                    code:Math.floor(Math.random()*1000000),
                    codeExpires:Date.now()+3600000
                })
                newUser.save()
            confirmCodeEmail.confirmCodeEmail(newUser.email,newUser.code)
            res.json({success:true,email:newUser.email})

            }
        })
        
    },
    confirmCode: (req, res) => {
        User.findOne({ email: req.body.email.toLowerCase()})
        .then(data => {
       
            if (data) {

                if(data.code == req.body.code){
                    if(data.codeCounter > 0 && moment(data.codeExpire) > moment()){
                        data.codeCounter = 3;
                        data.isActive = true;
                        data.save();

                        let token = jwt.sign(req.body.email,privateKey);
                        res.json({token: token })
                    }
                    else{
                        res.status(500).json({"message":"Code counter or code expire error!"})
                    }
                }
                else{
                    data.codeCounter = data.codeCounter - 1;
                    data.save();
                    res.status(500).json({"message":"Code wrong!"})
                }
            }
            else {
                res.status(500).json({ "msg": "Confirm Code error" })
            }
        })
        .catch(err => {
            console.log('Err', err);
            res.status(500).send("Mongo error!")
        })
    },
    login: (req, res) => {
        User.findOne({ email: req.body.email.toLowerCase()}).then((user)=>{
            if(user){
                if(user.isActive){
                    if(user.password == req.body.password){
                        let token = jwt.sign(req.body.email,privateKey);
                        res.json({token: token })
                    }
                    else{
                        res.status(400).json({"message":"Password wrong!"})
                    }
                }
                else{
                    res.status(400).json({"message":"User is not active!"})
                }
            }
            else{
                res.status(400).json({"message":"User not found!"})
            }
        })
    }
}

module.exports = userController;