import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(401).json({ error: "Incomplete details" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(409).json({ error: "User already exist." });
  }

  // autogen salt and hash
  const hash = bcrypt.hashSync(password, 10);

  try {
    const newUser = new User({ email, username, password: hash });
    await newUser.save();

    const token = generateToken(newUser.id);

    res
      .cookie("token", token, { maxAge: process.env.JWT_EXPIRY * 1000 }) //ms
      .status(201)
      .json({
        _id: newUser.id,
        email,
        username,
        token,
      });
  } catch (error) {
    res.status(400).json({ error: "Invalid user data." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists && bcrypt.compareSync(password, userExists.password)) {
    const { email, username, id } = userExists;

    const token = generateToken(id);

    res
      .cookie("token", token, { maxAge: process.env.JWT_EXPIRY * 1000 })
      .status(200)
      .json({ _id: id, email, username, token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRY),
  });
};

export { register, login };
