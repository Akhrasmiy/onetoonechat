const express = require('express');
const { showchat, mechat } = require('./_controllers');
const isLoggedIn = require('../../shared/auth/is-loggedin');

const router = express.Router();

router.get('/chat/:userid',isLoggedIn, showchat)
router.get('/chat/',isLoggedIn, mechat)
module.exports = router;
