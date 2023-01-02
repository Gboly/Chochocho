import User from "../models/user.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let authToken;

  if (req.headers["auth-token"]) {
    try {
      authToken = req.headers["auth-token"];
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

      // Remove password from the result since i'll be attaching it to req.user and would then be passsed to the frontend
      const user = await User.findById(decodedToken.id, { password: 0 });
      req.user = user;

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "User is not authorized" });
    }
  }

  if (!authToken) {
    return res
      .status(401)
      .json({ error: "User is not authorized. Token not found" });
  }
};

export { protect };
