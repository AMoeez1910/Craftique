const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer=require('nodemailer')
const passport = require("passport")
const User = require('../models/db')
const Brand = require('../models/brand')
const Order = require('../models/order')
const Product = require('../models/product')
const Review = require('../models/review')
const Category = require('../models/category')
const OAuth2Strategy = require("passport-google-oauth20").Strategy
const findOrCreate = require("mongoose-findorcreate")
const { Schema } = require('mongoose')
// const email_existence = require('email-existence') 

const createBrand = async (req, res) => {
    const id = '663813e6f423a77101974981'
    const newBrand = new Brand({
        name: 'nike',
        email: 'needaspeed639@gmail.com',
        phoneNumber: '0334382323',
        isActive: true
      });
        try {
            const data = await newBrand.save();
            const user = await User.updateOne({_id:id},{brand:data._id})
            console.log(data,user)
        } catch (error) {
            console.error('Error creating brand:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
}
const createProduct = async (req, res) => {
   try
    {
    const id = '663e93ceddd824bd6999a316'
    const newProduct1 = new Product({
        name: 'Air Max',
        images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfbv-C4Oy91TefTMDzO7bjDnpe8XozkteFdsouRLXSfA&s'],
        description: 'SpaceX Zoom Pegasus Rocket',
        quantity: 4,
        price: 599,
        discount: 0,
        isActive: true,
        brand: id
    })
    await newProduct1.save()
    console.log('Products created successfully');
}
catch(err){
    console.log(err)
}
}

const createOrder = async (req, res) => {
    try {
        const userid='6636b653eba042620bcbd619'
        const products=[{
            product: '663f4711abbaf104f1d16335',
            quantity: 1
        },
        {
            product: '663f47db42941de439425370',
            quantity: 2
        }
    ]
        const newOrder = new Order({
            buyer: userid,
            products: products,
            totalPrice: 100,
            status: 'Pending'
        })
       const data= await newOrder.save()
       await User.updateOne({_id:userid},{$push:{orders:data._id}})
       console.log('çreated succesfully')

    } catch (error) {
        console.log(error)
    }
}
/////
const sendVerifyEmail = async (name, email, id) => {
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: 'needaspeed639@gmail.com',
                pass: 'qsws dzzd gokz uytu',
            },
        });
        const expirationTimestamp = Math.floor(new Date().getTime() / 1000)

        const mailOptions = {
            from: 'needaspeed639@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: `<div style="font-family: Arial, sans-serif; margin: 0 auto; max-width: 600px; padding: 20px;">
            <h2 style="color: #333;">Hi ${name},</h2>
            <p style="color: #555;">Please verify your email address by clicking the button below:</p>
            <div style="text-align: center; margin-top: 20px;">
                <a href="http://localhost:3000/verify/${id}/${expirationTimestamp}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
            </div>
        </div>`,
        };

        const data = await transporter.sendMail(mailOptions);
        console.log('EMAIL SENT ', email, data.response);
    } catch (error) {
        console.error('Error sending verification email:', error.message);
    }
};
const verifyMail = async (req, res) => {
    const { id, expirationTimestamp } = req.params;
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    const expirationTime = 60; // 60 seconds
    try {
        if ((parseInt(currentTimestamp) - parseInt(expirationTimestamp) <= parseInt(expirationTime))) {
            const data  = await User.updateOne({_id:id},{verified:true});
            if(data){
                res.json({success:'Email verified'})
            }
        }
    }
        catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
const registerUser = async (req, res) => {
    const { FirstName, LastName, email, password,phoneNo } = req.body;
    if(password.length < 6){
        return res.json({
            error:'Password is required and must be 6 characters long'
        })
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            FirstName:FirstName,
            LastName:LastName,
            email:email,
            password: hashedPassword,
            phoneNo:phoneNo
        });
        sendVerifyEmail(FirstName,email,user._id)
        res.json(user);
    } catch (e) {
        res.json({ error: e });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });

        if (!userDoc || !userDoc.verified || !userDoc.password) {
            return res.json({ error: 'User not found' });
        }

        const passOk = await bcrypt.compare(password, userDoc.password);
        if (!passOk) {
            return res.json({ error: 'Incorrect Email or Password' });
        }

        // const orderData = {
        //     Status: 'Shipped',
        //     Price: 100,
        //     Date: new Date(),
        //     Time: new Date().toLocaleTimeString()
        // };
        // userDoc.orders.push(orderData);
        // await userDoc.save();

        jwt.sign({
            FirstName: userDoc.FirstName,
            email: userDoc.email,
            id: userDoc._id
        }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Error signing JWT:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // createBrand()
            // createProduct()
            createOrder()
            res.cookie('token', token);
            res.json({ success: 'Successfully Login', user: userDoc });
        });
    } catch (error) {
        console.error('Error in loginUser: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProfile= async (req,res)=>{
    const {token} = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const {FirstName,email,_id,address} = await User.findById(userData.id);
      res.json({FirstName,email,_id,address});
      
    });
  } else {
    res.json(null);
  }
}
const logOut =(req,res) =>{
    res.clearCookie('token', { sameSite: 'None', secure: true });
    res.clearCookie('connect.sid', { sameSite: 'None', secure: true })
    return res.json({Status:"Success"})
}
const PasswordReset = async (req, res) => {
    const { email } = req.body
    try {
        const data = await User.findOne({email})
        if(data){
            const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, { expiresIn: 100 })
            emailNewPass(data._id,token,email)
            return res.json({success:'An email has been sent'})
        }
        else{
            return res.json({
                            error: 'Email doesnt exists!'
                        })
        }
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const emailNewPass = async (id,token,email) =>{
    url = `http://localhost:3000/ForgotPassword/${id}/${token}`
            try {
                const transporter = nodemailer.createTransport({
                    service:"gmail",
                    auth: {
                        user: 'needaspeed639@gmail.com',
                        pass: 'qsws dzzd gokz uytu',
                    },
                });
                const mailOptions = {
                    from: 'needaspeed639@gmail.com',
                    to: email,
                    subject: 'Password Reset',
                    html: ` <div style="font-family: Arial, sans-serif; margin: 0 auto; max-width: 600px; padding: 20px;">
                    <p style="color: #333;">Please click the link below to reset your password:</p>
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="${url}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Password</a>
                    </div>
                </div>`,
                };
                
                const data = await transporter.sendMail(mailOptions);
                console.log('EMAIL SENT ', email, data.response);
        }
            catch (error) {
                console.error('Error sending verification email:', error.message);
            }
}
const NewPassword = (req, res) => {
    const { id, token } = req.params
    const { password } = req.body
    try
    {jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.json({
                    error: 'Session Expired'

                })
            }
            else {
                if (password.length < 6) {
                    return res.json({
                        error: 'Password is required and must be 6 characters long'
                    })
                }
                else {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    const data  = await User.updateOne({_id:id},{password:hashedPassword});
                    if(data){
                        res.json({success:'Password Updated'})
                    }
                }
            }
        }
    )
    }
    catch(err){
        console.error('Error comparing passwords:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

function generateToken(user){
    return jwt.sign({ FirstName:user.FirstName,email:user.email,id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
const getUserProfileData = async (req,res)=>{
    const {id}=req.params
    try {
        const user = await User.findById(id).populate({
            path: 'orders',
            select: '_id totalPrice status placedAt', // Include _id which is orderId
        });

        const userProfileData = {
            FirstName: user.FirstName,
            LastName: user.LastName,
            email: user.email,
            address: user.address,
            googleID: user.googleID,
            phoneNo: user.phoneNo,
            orders: user.orders.map(order => ({
                orderId: order._id, 
                totalPrice: order.totalPrice,
                status: order.status,
                placedAt: order.placedAt,
            }))
        };

        res.json(userProfileData);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { data,phoneNo } = req.body;
    const { FirstName, LastName, newPassword, confirmPassword } = data;
    console.log(phoneNo)
    try {
        if (!!newPassword) {
            if (newPassword === confirmPassword && newPassword.length >= 6) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                await User.updateMany({ "_id": id }, { "$set": { "FirstName": FirstName, "LastName": LastName, "password": hashedPassword,'phoneNo':phoneNo } });
                return res.json({ success: "Changes updated along with password" });
            } else {
                return res.json({ error: "Password doesn't match or must be at least 6 characters long!" });
            }
        } else {
            await User.updateMany({ "_id": id }, { "$set": { "FirstName": FirstName, "LastName": LastName,'phoneNo':phoneNo } });
            return res.json({ success: "Changes updated" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateUserAddress = async (req,res)=>{
    const {id} = req.params
    const {data} = req.body
    const {shippingAddress,shippingCity,shippingCountry,billingAddress,billingCity,billingCountry} = data
    try {
        await User.updateMany({"_id":id},{"$set":{
            "address.shippingAddress.address":shippingAddress,"address.shippingAddress.city":shippingCity,"address.shippingAddress.country":shippingCountry,
            "address.billingAddress.address":billingAddress,"address.billingAddress.city":billingCity,"address.billingAddress.country":billingCountry
        }})
        return res.json({ success: "Changes updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getProducts = async (req,res)=>{
    try {
        const products = await Product.find().populate(path='brand',select='name')
        res.json(products)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}
const placeOrder = async (req,res)=>{
    const {cart,total,user} = req.body
    try {
        const newOrder = new Order({
            buyer: user,
            products: cart,
            totalPrice: total,
            status: 'Pending'
        })
        const data = await newOrder.save()
        await User.updateOne({_id:user},{$push:{orders:data._id}})
        return res.json({ success: "Order placed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    
}
module.exports = {registerUser,loginUser,getProfile,logOut,verifyMail,NewPassword,PasswordReset,generateToken,getUserProfileData,updateUserProfile,updateUserAddress,getProducts,placeOrder}