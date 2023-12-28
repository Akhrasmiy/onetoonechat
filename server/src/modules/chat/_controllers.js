const express = require('express');
const httpValidator = require('../../shared/http-validator');
const { postUserSChema, loginUserSchema, verifyUserSchema, forgotpasswordSchema, forgotpassword2Schema } = require('./_schemas');
const User = require('./Chat');
const getchat = require('./getChat');
const getallChat = require('./getallchat');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const showchat = async (req, res, next) => {
  try {
    
    const user1=req.user.user.id
    const user2=req.params.userid

    const result = await getchat(user1,user2);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const mechat = async (req, res, next) => {
  try {
    
    const user=req.user.user.id

    const result = await getallChat(user);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};




module.exports = {
  showchat,
  mechat
};
