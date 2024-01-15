import { validateLogin, validatePassword, validateEmail } from "../schemas/users.js";

class AuthController {
  constructor({ authModel }) {
    this.authModel = authModel;
  }

  login = async (req, res) => {
    const result = validateLogin(req.body);

    if (result.error) {
      return res.status(422).json({
        error: JSON.parse(result.error.message),
      });
    }

    const user = await this.authModel.login({ input: result.data });

    if (!user)
      return res.status(401).json({ error: "Invalid user or password" });

    return res.send({
      name: user.user.name,
      email: user.user.email,
      token: user.token,
    });
  };

  changePassword = async (req, res) => {
    const result = validatePassword(req.body);

    if (result.error) {
      return res.status(422).json({
        error: JSON.parse(result.error.message),
      });
    }

    const { id } = req.token;
    const rta = await this.authModel.changePassword({
      newPassword: result.data,
      id,
    });

    if (!rta) {
      return res.status(400).json({ error: "Proccess failed" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  };

  recoverPassword = async (req, res) => {
    const result = validateEmail(req.body);

    if (result.error) {
      return res.status(422).json({
        error: JSON.parse(result.error.message),
      });
    }

    const rta = await this.authModel.recoverPassword({ email: result.data });

    if (!rta) {
      return res.status(400).json({ error: "Proccess failed" });
    }

    res.status(200).json({ message: "Email sent" });
  };
}

export { AuthController };
