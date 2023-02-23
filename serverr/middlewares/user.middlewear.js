import User from "../models/User.js";
import { decodeToken } from "../utils/user.helper.js";
import UserService from "../services/user.service.js";

// const userVerified = async (req, res, next) => {
//     const { email } = req.body
//     const userVerify = await User.findOne({ email })
//     if (userVerify) {
//         return next()
//     }
//     return res.status(400).json({
//         message: "user doesn't exist"
//     })
// }

// const userLoggedIn = async (req, res, next) => {
//     const header = req.headers.authorization
//     if (!header) {
//         return res.status(403).json({
//             message: "Not logged in"
//         })
//     }

//     const token = header.split(" ")[1]
//     const userInfo = decodeToken(token)
//     const user = await UserService.userExist(userInfo)
//     req.user = user

//     return next()
// }

const userEngagingLoggedIn = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(403).json({
      message: "Not logged in",
    });
  }
  const token = header.split(" ")[1];
  const userInfo = decodeToken(token);
  console.log(userInfo);
  const user = await User.findById(userInfo.id); 
  console.log(user)
  req.body.userId = user._id.toString();
  return next();
};

const isAdminLoggedIn = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(403).json({
      message: "Not logged in",
    });
  }
  const token = header.split(" ")[1];
  const userInfo = decodeToken(token);
  const user = await UserService.userExist(userInfo);
  req.user = user;

  if (user.role !== "admin") {
    return res.status(401).json({
      message: "Request denied. Only for admin",
    });
  }
  return next();
};

export { 
    // userVerified, userLoggedIn,
     userEngagingLoggedIn, 
     isAdminLoggedIn
};
