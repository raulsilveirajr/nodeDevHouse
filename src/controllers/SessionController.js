import * as yup from "yup";
import User from "../models/User.js";

yup.setLocale({
  mixed: {
    default: "Is invalid",
  },
  number: {
    min: "Should be bigger than ${min}",
  },
});

const schema = yup.object({
  email: yup.string().email().required(),
});

class SessionController {
  async store(req, res) {
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({
        error: "Internal error.",
        message: err.name,
        errors: err.errors,
      });
    }

    const { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
      return res.json({ message: "Session storaged.", data: user });
    }

    return res
      .status(400)
      .json({ error: "E-mail is unavailable.", data: user });
  }
}

export default new SessionController();
