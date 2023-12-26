const express = require('express');
const { login, logout } = require('../../controllers/admin/authController.js');
const router = express.Router();
const apiconfig = require('../../apiconfig.json')
console.log(`${apiconfig.API_ENDPOINT.LOGIN}`)

router.post(`${apiconfig.API_ENDPOINT.LOGIN}`, login);
router.post(`${apiconfig.API_ENDPOINT.LOGOUT}`, logout);

module.exports = router;
