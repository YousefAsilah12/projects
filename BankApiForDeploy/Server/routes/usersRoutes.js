const express = require('express');
const router = express.Router();
const {
  loginUser,
  authorize,
  adminAuthorize
} = require('../Controllers/auth')

const {
  addUser,
  depositCash,
  getByPId,
  updateCredit,
  withdraw,
  transfer,
  getAll
} = require('../Controllers/usersController')





router.route("/login").post(loginUser)


router.use(adminAuthorize)
router.route("/:id").get(getByPId)
router.route("/").get(getAll).post(addUser);

router.route("/deposit").post(depositCash);
router.route("/updateCredit").post(updateCredit);
router.route("/withdraw").post(withdraw);
router.route("/transfer").post(transfer)


module.exports = router