import { validateLogin } from "../schemas/users.js";

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
      token: user.token
    });
  };
}

export { AuthController };
