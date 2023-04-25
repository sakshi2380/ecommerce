const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  signup,
  otpVerify,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
// router.route("/signup").post(signup);
// router.route("/signup/verify").post(otpVerify);

router.route("/password/reset").put(resetPassword)

router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router

  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);
router
  .route("/admin/users/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);
router
  .route("/admin/users/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
