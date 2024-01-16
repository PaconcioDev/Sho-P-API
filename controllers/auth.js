import { handleProcessFailure } from "../utils/handleProccessFailure.js";

class AuthController {
  constructor({ authModel }) {
    this.authModel = authModel;
  }

  login = async (req, res) => {
    const { validatedData } = req;
    const user = await this.authModel.login({ input: validatedData });
    if (!user) {
      handleProcessFailure(res, 401, "Invalid user or password");
      return;
    }

    return res.send({
      name: user.user.name,
      email: user.user.email,
      token: user.token,
    });
  };

  changePassword = async (req, res) => {
    const { id } = req.token;
    const { validatedData } = req;
    const rta = await this.authModel.changePassword({
      newPassword: validatedData,
      id,
    });
    if (!rta) {
      handleProcessFailure(res, 400, "Process failed");
      return;
    }

    res.status(200).json({ message: "Password updated successfully" });
  };

  recoverPassword = async (req, res) => {
    const { validatedData } = req;
    const rta = await this.authModel.recoverPassword({ email: validatedData });
    if (!rta) {
      handleProcessFailure(res, 400, "Process failed");
      return;
    }

    res.status(200).json({ message: "Email sent" });
  };
}

export { AuthController };
