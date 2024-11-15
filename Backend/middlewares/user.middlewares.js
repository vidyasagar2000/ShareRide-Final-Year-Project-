const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    // console.log('Auth check in authentication cookies:', req.cookies);
    const tokenCookieValue = req.cookies?.[cookieName] || req.headers.authorization?.split(' ')[1];
    // Ensure you are checking for the correct cookie by its name

    // console.log('Auth check in authentication headers:', tokenCookieValue);

    // If no token is found, proceed without attaching user data
    if (!tokenCookieValue) {
      return next();
    }

    req.token=tokenCookieValue;

   // console.log('Auth check in authentication headers:', req.token);
    
    try {
      const userPayload = validateToken(tokenCookieValue);  // Assuming this function is available
      // console.log('User payload after token validation:', userPayload);
      req.user = userPayload._doc || userPayload;  // In case the payload has a different structure
    } catch (error) {
      // console.error('Token validation error:', error);  // Logging validation errors
    }

    return next();
  };
}


function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.end("Please Login First");
    if (!roles.includes(req.user.role)) {
      return res.end("UnAuthorized");
    }
    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
  restrictTo,
};
