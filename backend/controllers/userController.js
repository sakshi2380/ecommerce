const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const dotenv = require("dotenv");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const otpGenerator = require("otp-generator");
const { OTP, Otp } = require("../models/otpModel");
dotenv.config({
  path: "C:/Users/prati/OneDrive/Desktop/Javascript/internship/Project1/backend/config/config.env",
});
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "djkggzbn9",
  api_key: "166265738528474",
  api_secret: "I4V4jOJ2IkliR6k31ASSpp_z1ik",
  secure: true,
});

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user1 = await User.findOne({ email });
  if (!user1) {
    const user = await User.create({
      name,
      email,
      password,
    });
    sendToken(user, 201, res);
  } else {
    res.status(401).json({
      success: false,
      message: "User Already Exist..",
    });
  }
});
// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    // return next(new ErrorHander("Please Enter Email & Password", 400));
    res.status(400).json({
      success: false,
      message: "Please Enter Email & Password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    // return next(new ErrorHander("Invalid email or password", 401));
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    // return next(new ErrorHander("Invalid email or password", 401));
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  sendToken(user, 200, res);
});
// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  if (res.headersSent !== true) {

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  }
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    // return next(new ErrorHander("User not found", 404));
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password?token=${resetToken}`;

  const message = `Your OTP is :- \n\n ${resetToken} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
      resetToken,
      status: 200,
    });
  } catch (error) {


    await user.save({ validateBeforeSave: false });

    // return next(new ErrorHander(error.message, 500));
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = req.body.otp
  console.log(resetPasswordToken, "vjuhudhu");
  const user = await User.findOne({
    resetPasswordToken,

  });
  console.log();
  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined

  await user.save();

  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {


  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.uploader.destroy(imageId);

    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }


  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    // return next(new ErrorHander("Old password is incorrect", 400));
    res.status(400).json({
      success: false,
      message: "Old password is incorrect",
    });
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    // return next(new ErrorHander("password does not match", 400));
    res.status(400).json({
      success: false,
      message: "password does not match",
    });
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get single user
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.findById(req.params.id);

  if (!users) {
    return next(
      // new ErrorHander(`User does not exist with Id: ${req.params.id}`)
      res.status(400).json({
        success: false,
        message: `User does not exist with Id: ${req.params.id}`,
      })
    );
  }

  res.status(200).json({
    success: true,
    users,
  });
});

//update (admin) role
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      // return next(
      //   new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
      // );
      res.status(400).json({
        success: false,
        message: `User does not exist with Id: ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


exports.signup = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    // return next(new ErrorHander("User not found", 404));
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const OTP = otpGenerator.generate(4, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const email = req.body.email;
  console.log(OTP);
  const otp = new Otp({ email: email, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  const result = await otp.save();
  const message = `Your OTP is :- \n\n ${OTP} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.otpVerify = catchAsyncErrors(async (req, res, next) => {
  const otpHolder = await Otp.find({
    otp: req.body.otp,
  });
  console.log(otpHolder);
  // if (otpHolder.length === 0) {
  //   return res.status(400).json({
  //     success: true,
  //     message: "not valid otp",
  //     status: 200,
  //   });
  // }
  // const rightOtpFind = otpHolder[otpHolder.length - 1];
  // const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
  // if ((rightOtpFind.email = req.body.email && validUser)) {
  //   const OtpDelete = await Otp.deleteMany({
  //     number: rightOtpFind.email,
  //   });
  // }
  // return res.status(200).json({
  //   success: true,
  //   message: "OTP verified sucessfully",
  // });
});
