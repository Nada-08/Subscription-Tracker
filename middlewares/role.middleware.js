
const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. Admins only." });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error in admin check.", error: error.message });
  }
};

export default isAdmin