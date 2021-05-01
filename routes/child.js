const express = require("express");

const router = express.Router();

const { createChild, getChild } = require("../controller/child");

const { childValidator } = require("../middlewares/allvalidator");
router.post("/beneficiary/child-profile-create", childValidator, createChild);
router.get("/beneficiary/get-child-profile", getChild);

module.exports = router;
