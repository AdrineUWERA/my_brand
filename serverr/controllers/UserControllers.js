import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import dotenv from "dotenv";
import UserService from "../services/user.service.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
  decodeToken,
} from "../utils/user.helper.js";

dotenv.config();

const SignUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    let role;
    if (req.body.role) {
      role = req.body.role;
    }
    const userExist = await UserService.userExist({ email: email });

    if (userExist) {
      return res.status(400).json({
        message: "User arleady exists",
      });
    }

    const createdUser = await UserService.createUser({
      fullName: fullName,
      email: email,
      password: hashPassword(password),
      role: role,
    });

    const token = generateToken(
      { id: createdUser.id, role: createdUser.role },
      "1d"
    );

    return res.status(201).json({
      message: "User registered successfully",
      token: token,
      data: createdUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: `Error: ${err}`,
    });
  }
};

const getAllusers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "All users", data: users });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: `Error: ${err}`,
    });
  }
};

const getOneUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  return res.status(200).json({ message: "One User", data: user });
};

// const deleteUser = async (req, res) => {
//   const user = await User.findOneAndDelete(req.params.id);
//   return res.send({ message: "user deleted", user: user });
// };

// const updateUser = async (req, res) => {
//   const user = await User.findOneAndUpdate(req.params.id, req.body);
//   const updated = await User.findById(req.params.id);
//   return res.send({ user: updated, message: "user updated" });
// };

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await UserService.userExist({ email: email });
    if (!userExists) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const validPassword = comparePassword(password, userExists.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateToken(
      { id: userExists.id, role: userExists.role },
      "1d"
    );

    return res.status(200).header("authenticate", token).json({
      message: "User successfully logged in",
      token: token,
      role: userExists.role,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: `Error: ${err}`,
    });
  }
};

export {
  SignUp,
  getAllusers,
  UserLogin,
  getOneUser
  // deleteUser, updateUser
};
