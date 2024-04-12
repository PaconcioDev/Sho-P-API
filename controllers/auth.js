class AuthController {
  constructor({ authModel }) {
    this.authModel = authModel;
  }

  login = async (req, res) => {
    const { validatedData } = req;
    const user = await this.authModel.login({ input: validatedData });

    if (!user)
      return res.status(401).json({ error: "Invalid user or password" });

    return res.send({
      name: user.user.name,
      email: user.user.email,
      token: user.token,
    });
  };

  changePassword = async (req, res) => {
    const { id } = req.token;
    const { password } = req.validatedData;
    
    const rta = await this.authModel.changePassword({
      newPassword: password,
      id,
    });

    if (!rta) return res.status(400).json({ error: "Process failed" });

    res.status(200).json({ message: "Password updated successfully" });
  };

  sendPasswordEmail = async (req, res) => {
    const { validatedData } = req;
    const rta = await this.authModel.sendPasswordEmail({ email: validatedData });

    if (!rta) return res.status(400).json({ error: "Process failed" });

    res.status(200).json({ message: "Email sent" });
  };

  recoverPassword = async (req, res) => {
    const { sub } = req.token;
    const { password } = req.validatedData;
    
    const rta = await this.authModel.changePassword({
      newPassword: password,
      id: sub,
    });

    if (!rta) return res.status(400).json({ error: "Process failed" });

    res.status(200).json({ message: "Password updated successfully" });
  };
}

export { AuthController };
