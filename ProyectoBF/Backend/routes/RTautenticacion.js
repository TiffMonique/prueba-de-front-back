const {Router} = require("express");

const {login} = require("../controller/autenticacion")

const router=Router();

router.post('/login',login);

module.exports=router;