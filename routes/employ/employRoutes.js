const express = require('express');
const apiconfig = require('../../apiconfig.json')
const { addEmploy, employList, updateEmploy, deleteEmployee } = require('../../controllers/employ/employController');
const { verifyToken } = require('../../utils/authUtils');

const router =express.Router();

router.post(`${apiconfig.API_ENDPOINT.ADD_EMPLOY}`,verifyToken, addEmploy)
router.post(`${apiconfig.API_ENDPOINT.EMPLOY_LIST}`,verifyToken, employList)
router.put(`${apiconfig.API_ENDPOINT.EMPLOY_UPDATE}`,verifyToken, updateEmploy)
router.delete(`${apiconfig.API_ENDPOINT.EMPLOY_DELETE}`,verifyToken, deleteEmployee)




module.exports = router;