const mongoose = require("mongoose");
const User = require("../models/user.models.js");

const fetchUserDetails = async (req, res) => {
  const { users } = req.body;  // Correctly access req.body
  console.log("Fetch users details ", req.body);

  if (!users || users.length === 0) {
    return res.status(400).json({ message: "No user id provided" });
  }

  try {
    // Convert user IDs from string to ObjectId
    const objectIdUsers = users.map((user) =>new mongoose.Types.ObjectId(user));

    const userDetails = await User.aggregate([
      {
        $match: {
          _id: {
            $in: objectIdUsers,  // Use ObjectId for matching
          },
        },
      },
    ]);

    console.log("userdetails", userDetails);

    if (userDetails.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ userDetails });
  } catch (error) {
    console.error("Error fetching user details", error);
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

module.exports = fetchUserDetails;
