const express = require('express');
const { verifyToken } = require('../../utils/authUtils.js');
const { viewProfile } = require('../../controllers/admin/profileController.js');
const router = express.Router();

router.get('/', verifyToken, viewProfile);

module.exports = router;
