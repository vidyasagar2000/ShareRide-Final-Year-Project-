// const { uploadOnCloudinary } = require("../files.uploader/cloudinary.uploaders.js");
const { uploadToCloudinary } = require("../middlewares/multer.middlewares.js");
const User = require("../models/user.models");
// const { use } = require("../routes/user.routes");

// Update Profile Function
const updateProfile = async (req, res) => {
  const { fullName, phoneNo, password, enrollmentNo, _id } = req.body;

  try {
    // Validate required fields
    if ((!fullName && !phoneNo) || !password) {
      return res.status(400).json({ message: 'Full name, phone number, and password are required' });
    }

    // Authenticate user by checking password
    const token = await User.matchPasswordAndGenerateToken(enrollmentNo, password);

    // Build the update object conditionally (only if the values are not empty strings)
    const updateData = {};
    if (fullName && fullName.trim() !== '') {
      updateData.fullName = fullName.trim().toLowerCase();
    }
    if (phoneNo && phoneNo.trim() !== '') {
      updateData.phoneNo = phoneNo.trim();
    }

    // If no valid update data, return an error
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid data to update' });
    }

    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: false } // Returns the updated user, skips validation
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the updated user data with token
    res.status(200).json({ user: updatedUser, token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Password Function
const updatePassword = async (req, res) => {
  const { password, newPassword,enrollmentNo, _id } = req.body;
  
  // console.log("user in update password",req.user);

  // const { enrollmentNo, _id } = req.user;

  try {
    // Validate fields
    if(!enrollmentNo || !_id )
    if (!password || !newPassword || password.trim() === '' || newPassword.trim() === '') {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    // Authenticate user by checking current password
    const token = await User.matchPasswordAndGenerateToken(enrollmentNo, password);

    // Find the user by ID
    const user = await User.findById(_id);
    if (!user) {
      // console.log('!user in update password', user);
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's password
    user.password = newPassword;

    // Save the updated password
    await user.save();

    // Send success response with a new token
    res.status(200).json({ message: 'Successfully updated password', token, user});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const updateProfileImage = async (req, res, next) => {
//   try {
//     console.log("updateProfileImage", req.files);
//     console.log("user in image upload", req.user);

//     // Get the path of the uploaded image
//     const userProfileImagePath = req.files && req.files.userProfileImage ? req.files.userProfileImage[0].path : null;
//     let uploadedUserProfileImage = { url: '' };

//     // If an image path is available, upload the image to Cloudinary
//     if (userProfileImagePath) {
//       uploadedUserProfileImage = await uploadOnCloudinary(userProfileImagePath);
      
//       // Check if the upload was successful
//       if (!uploadedUserProfileImage || !uploadedUserProfileImage.url) {
//         throw new APIError(400, 'Unable to upload the userProfileImage');
//       }

//       // Update the user profile image URL in the database
//       await User.findByIdAndUpdate(req.user._id, { imageUrl: uploadedUserProfileImage.url.toLowerCase() });

//       // Fetch the updated user data from the database
//       const userInDb = await User.findById(req.user._id);

//       // Check if the image URL is properly updated
//       if (!userInDb || userInDb.imageUrl !== uploadedUserProfileImage.url.toLowerCase()) {
//         throw new APIError(502, 'Unable to update user profile image');
//       }

//       // Respond with the updated user data
//       res.status(200).json({ user: userInDb });
//     } else {
//       throw new APIError(400, 'No image file was provided');
//     }
//   } catch (error) {
//     console.error('Server Error:', error);
//     res.status(500).json({ error: 'An unexpected error occurred' });
//     next(error);
//   }
// };


const updateProfileImage = async (req, res, next) => {
  try {
    // console.log("Uploaded files: ", req.files); // This should show the file info

    if (!req.files || !req.files.userProfileImage) {
      throw new APIError(400, 'No image file was provided');
    }

    // Cloudinary will handle file storage
    const uploadedUserProfileImage = req.files.userProfileImage[0];
    
    if (!uploadedUserProfileImage || !uploadedUserProfileImage.path) {
      throw new APIError(400, 'Unable to upload the userProfileImage');
    }

    // Save image URL in DB
    await User.findByIdAndUpdate(req.user._id, { imageUrl: uploadedUserProfileImage.path.toLowerCase() });

    const userInDb = await User.findById(req.user._id);
    res.status(200).json({ user: userInDb });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
    next(error);
  }
};


module.exports = { updateProfile, updatePassword, updateProfileImage };
