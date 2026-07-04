import jwt from "jsonwebtoken";

export const genToken = async (user, res) => {
  try {
    const payload = {
      id: user._id,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d", // default time is 1 min
    });
    res.cookie("Oreo", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax", // at time of deployment its is made none
    });
  } catch (error) {
    throw next(error);
  }
};
