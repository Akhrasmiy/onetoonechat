const express = require('express');
const addUser = require('./add-user');
const httpValidator = require('../../shared/http-validator');
const { postUserSChema, loginUserSchema, verifyUserSchema, forgotpasswordSchema, forgotpassword2Schema } = require('./_schemas');
const signInUser = require('./login');
const verified = require('./isverified');
const { replynewpassword, newpassword } = require('./replynewpassword');
const listUsers = require('./list-users');
const User = require('./User');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postUserSChema);
    const a=Math.floor(Math.random()*10**6)
    console.log(a)
    const result = await addUser({...req.body,a});

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const verify=async(req,res,next)=>{
  try {
    console.log("a")
    httpValidator({ body: req.body }, verifyUserSchema);

    const result = await verified(req.body);
    
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
const forgotPassword=async(req,res,next)=>{
  try {
    httpValidator({ body: req.body }, forgotpasswordSchema);
    const newpasword=Math.floor(Math.random()*10**6)
    console.log(newpasword)
    const result = await replynewpassword(req.body.email,newpasword);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
const forgotPassword2 =async(req,res,next)=>{
  try {
    httpValidator({ body: req.body }, forgotpassword2Schema);
    const newpasword=Math.floor(Math.random()*10**6)
    console.log(newpasword)
    const result = await newpassword(req.body.email,req.body.password,req.body.emailpassword);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

const loginUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, loginUserSchema);

    const result = await signInUser(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const GetUser = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    const result = await listUsers(q);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};




module.exports = {
  postUser,
  loginUser,
  verify,
  forgotPassword,
  forgotPassword2,
  GetUser
};
