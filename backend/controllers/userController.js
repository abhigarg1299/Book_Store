import { user } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    //check username length
    if (username.length < 4) {
      return res.status(400).json({
        message: "Username length should greater than 3",
      });
    }

    const existingUsername = await user.findOne({ username: username });

    if (existingUsername) {
      return res.status(400).json({
        message: "username already exists",
      });
    }

    const existingEmail = await user.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({
        message: "email already exists",
      });
    }

    if (password.length <= 5) {
      return res.status(400).json({
        message: "Password length should greater than 5",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      username: username,
      email: email,
      password: hashedPassword,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({
      message: "SignUp successfully",
    });
    //check user exits
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await user.findOne({ username: username });
    if (!existingUser) {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existingUser.username },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, process.env.SECRET_KEY, {
          expiresIn: "30d",
        });
        res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        res.status(400).json({
          message: "Invalid Credentials",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await user.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await user.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({
      message: "Address Updated SuccessFully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
