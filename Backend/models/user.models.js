const mongoose = require("mongoose");
const { createHmac } = require("node:crypto");
const crypto = require("crypto");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
    },
    enrollmentNo: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    imageUrl: {
      type: String,
      // default: "/images/avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  // console.log("hng");
  const salt = crypto.randomBytes(16).toString();
  // console.log("hng");

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (enrollmentNo, password) {
    // console.log("auth",enrollmentNo)
    const user = await this.findOne({ enrollmentNo });
    // console.log(user);
    // console.log("enrollment no", enrollmentNo);
    if (!user) throw new Error("User not found with this enrollmentNo");
    const salt = user.salt;
    const hashedPassword = user.password;

    const providedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (hashedPassword !== providedPassword) {
      throw new Error("Incorrect Password");
    }
    // console.log("token grnerating")
    const token = createTokenForUser(user);
    // console.log(token)
    return token;
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
