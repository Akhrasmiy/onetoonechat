const express = require('express');
const { postUser, loginUser, verify, forgotPassword, forgotPassword2, GetUser } = require('./_controllers');

const router = express.Router();

router.post('/users', postUser);
router.get('/users', GetUser);
router.post('/users/verify',verify );
router.post('/users/login',loginUser)
router.post('/users/forgot1',forgotPassword)
router.post('/users/forgot2',forgotPassword2)
module.exports = router;
