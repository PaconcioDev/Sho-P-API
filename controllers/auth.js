import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { validateUser } from "../schemas/users.js";


class AuthController {
  constructor({ authModel }) {
    this.authModel = authModel;
  }

  signUp = async (req, res) => {
    const result = validateUser(req.body);

    if (result.error) {
      return res.status(422).json({
        error: JSON.parse(result.error.message),
      });
    }

    const newUser = await this.authModel.signUp({
      input: result.data,
    });

    if (newUser === "phone") {
      res.status(422).json({
        message: "This phone number is already registered",
      });
      return;
    } else if (newUser === "email") {
      res.status(422).json({
        message: "This email is already registered",
      });
      return;
    }

    const token = jwt.sign({ id: newUser.id }, config.jwtSecret);

    res.status(201).json(token);
  };

  //TODO: signIn = async (req, res) => {};
}

export { AuthController };
