const express = require("express");
const router = express.Router();

const User = require("../models/user.models.js");
const { updateProfile, updatePassword, updateProfileImage } = require("../controllers/updateUser.controllers.js");
const { upload } = require("../middlewares/multer.middlewares.js");

router.route("/signup").post(async (req, res) => {
  try {
    const { fullName, password, phoneNo, enrollmentNo } = req.body;
    console.log("signup request", req.body);

    let existingUser = await User.findOne({
      $or: [{ phoneNo }, { enrollmentNo }],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists with this enrollment number or phone number",
      });
    }

    const user = await User.create({
      fullName: fullName.trim().toLowerCase(),
      password,
      phoneNo: phoneNo.trim().toLowerCase(),
      enrollmentNo: enrollmentNo.trim().toLowerCase(),
    });

    console.log("User:", user);

    if (!user) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    console.log("User successfully created");
    res.status(201).json(user);
  } catch (error) {
    console.error("Error during signup:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.route("/signin").post(async (req, res) => {
  const { enrollmentNo, password } = req.body;
  // const {fullName, enrollmentNo, _id, phoneNo}=req.user;
  // console.log("signInrequest", req.body);
  // console.log("userExistedBefore",req.user);
  if(!enrollmentNo && !password && req.token ){
    const {fullName,_id, phoneNo}=req.user;
    const userInDb = await User.findById(_id).select(
      "-password -salt"
    );

   
    if(!userInDb){
      return res.status(400).json({msg:"Please Login First"});
    }

    console.log("userExistedBefore indb",userInDb);

    if(!req?.user?.fullName===userInDb.fullName || !req?.user?._id===userInDb._id || !req?.user?.phoneNo=== userInDb.phoneNo || !req?.user?.enrollmentNo.toLowerCase()===userInDb.enrollmentNo.toLowerCase() ){
      return res.status(400).json({msg:"Please Login First"});
    }
    const token= req.token;

    console.log("prev token of prev login",token);
    if(!token) return res.status(400).json({msg:"Please Login First"});

    console.log("login hua")
    return res.cookie("token", token, { httpOnly: true, secure: true }).json({
      success: true,
      msg: "Successfully SignedIn",
      token: token,
      user: userInDb,
    });

  }

  
  try {
    const token = await User.matchPasswordAndGenerateToken(
      enrollmentNo.toLowerCase(),
      password
    );

    const userInDb = await User.findOne({ enrollmentNo:enrollmentNo.toLowerCase() }).select(
      "-password -salt"
    );

    console.log("login hua")

    return res.cookie("token", token, { httpOnly: true, secure: true }).json({
      success: true,
      msg: "Successfully SignedIn",
      token: token,
      user: userInDb,
    });
  } catch (error) {
    return res.json({
      error: "Incorrect enrollmentNo or Password",
    });
  }
});

router.route("/logout").get(async (req, res) => {
  res
    .clearCookie("token")
    .send("Hope your ride gone well! Logged Out Successfully");
});

router.route("/").get(async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/updateProfile", updateProfile);
router.post("/updatePassword", updatePassword);
router.post("/updateProfileImage", upload.fields([{ name: 'userProfileImage', maxCount: 1 }]), updateProfileImage);

module.exports = router;

router.route("/getprofile").get(async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



