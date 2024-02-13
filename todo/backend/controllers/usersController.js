import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Todo from "../models/todoSchema.js";
// import dotenv from "dotenv"
// dotenv.config()




export const register = async (req, res) => {
  const { name, email, password, age, terms } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already Exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = new User({
      name,
      email,
      password: hashPassword,
      age,
      terms
    });

    await user.save();

    // const payload = {
    //   user: user._id,
    // }

    // const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: 360000
    // });

    // res.cookie("token", token, {
    //   httpOnly: true, secure: true, expiresIn: 360000
    // });

    req.session.user = {user:user._id};

    //Taken out password fron rest of the content fron frontend
    const { password: pass, ...rest } = user._doc;

    res.status(202).json({
      message: "User created Successfully",
      user: rest,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      errors: "Internal Server Eroor"
    });
  }
};






export const login = async (req, res) => {
  const { email, password } = req.body;


  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    // const payload = {
    //   user: user._id,
    // }

    // const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: 360000
    // });


    req.session.user = {user:user._id};
    // console.log(req.session.user);

    // const expirationDate = new Date();
    // expirationDate.setDate(expirationDate.getDate() + 1); // 1 day from now

    // res.cookie("token", token, { httpOnly: true, expiresIn: expirationDate });

    //Taken out password fron rest of the content fron frontend
    const { password: pass, ...rest } = user._doc;

    res.status(200).json({
      message: "User Login Successfull",
      user: rest
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      errors: "Internal Server Eroor"
    });
  }
};




export const logout = async (req, res) => {
  // res.clearCookie("todo");
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }

  res.status(200).json({
    message: "User Logged Out Successfully"
  })
})
};






export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const { password: pass, ...rest } = user._doc;
    return res.status(200).json({
      message: "User found", user: rest
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      errors: "Internal Server Eroor"
    });
  }
};





export const updateDetails = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    let user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({
        message: "user not found"
      });
    }

    let exists = await User.findOne({ email });
    if (exists && exists._id.toString() !== user._id.toString()) {
      return res.status(404).json({
        message: "Email Already Exists"
      });
    }

    user.name = name;
    user.email = email;
    user.age = age;

    await user.save();

    const { password: pass, ...rest } = user._doc;
    return res.status(200).json({
      message: "Profile updated successfully", user: rest
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      errors: "Internal Server Eroor"
    });
  }
};



export const updatePassword = async (req, res) => {
  const { password, newPassword } = req.body;

  try {
    let user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credential"
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();


    const { password: pass, ...rest } = user._doc;
    return res.status(200).json({
      message: "password updated successfully", user: rest
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      errors: "Internal Server Eroor"
    });
  }
};





export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const todo = await Todo.find({ user: req.user })
    if (todo) {
      await Todo.deleteMany({ user: req.user })
    }

    res.clearCookie("token");
    await user.deleteOne();

    res.status(200).json({
      message: "User Deleted successfully"
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      errors: "Internal Server Eroor"
    });
  }
};
