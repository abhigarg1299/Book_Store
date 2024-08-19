import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({
      message: "Authetication Token Required",
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Token expired, Please SignIn Again",
      });
    }
    req.user = user;
    next();
  });
};
export default isAuthenticated;
