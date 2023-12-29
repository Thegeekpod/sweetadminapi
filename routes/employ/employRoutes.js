const express = require('express');
const apiconfig = require('../../apiconfig.json')
const { addEmploy, employList, updateEmploy, deleteEmployee } = require('../../controllers/employ/employController');

const router =express.Router();

router.post(`${apiconfig.API_ENDPOINT.ADD_EMPLOY}`,addEmploy)
router.post(`${apiconfig.API_ENDPOINT.EMPLOY_LIST}`,employList)
router.put(`${apiconfig.API_ENDPOINT.EMPLOY_UPDATE}`,updateEmploy)
router.delete(`${apiconfig.API_ENDPOINT.EMPLOY_DELETE}`,deleteEmployee)




module.exports = router;