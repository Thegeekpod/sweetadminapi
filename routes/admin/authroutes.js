const express = require('express');
const { login, logout, viewProfile, authchecker,  } = require('../../controllers/admin/authController.js');
const router = express.Router();
const apiconfig = require('../../apiconfig.json');
const { verifyToken } = require('../../utils/authUtils.js');

router.post(`${apiconfig.API_ENDPOINT.LOGIN}`, login);
router.post(`${apiconfig.API_ENDPOINT.LOGOUT}`, logout);
router.get(`${apiconfig.API_ENDPOINT.PROFILE}`, verifyToken, viewProfile);
router.get('/authcheck', authchecker);


module.exports = router;
