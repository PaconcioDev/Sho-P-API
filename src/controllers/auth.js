class AuthController {
  constructor ({ authModel }) {
    this.authModel = authModel;
  }

  login = async (req, res) => {
    const { validatedData } = req;
    const user = await this.authModel.login({ input: validatedData });

    if (!user) { return res.status(401).json({ error: 'Invalid user or password' }); }

    return res.send({
      id: user.user.id,
      name: user.user.name,
      email: user.user.email,
      role: user.user.role,
      token: user.token
    });
  };

  checkExpiredToken = async (req, res) => {
    const authorization = req.get('authorization');
    const token = authorization.substring(7);

    const rta = await this.authModel.checkExpiredToken({
      token
    });

    if (rta) {
      return res.json({ error: 'Token expired', value: rta });
    } else {
      return res.json({ message: 'Token not expired', value: rta });
    }
  };

  changePassword = async (req, res) => {
    const { id } = req.token;
    const { currentPassword, password } = req.validatedData;

    const rta = await this.authModel.changePassword({
      currentPassword,
      newPassword: password,
      id
    });

    if (!rta) {
      return res.status(400).json({ error: 'Process failed' });
    } else if (rta.message) {
      return res.status(401).json({ error: rta.message });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  };

  sendPasswordEmail = async (req, res) => {
    const { validatedData } = req;
    const rta = await this.authModel.sendPasswordEmail({ email: validatedData });

    if (!rta) return res.status(400).json({ error: 'Process failed' });

    res.status(200).json({ message: 'Email sent' });
  };

  recoverPassword = async (req, res) => {
    const { sub } = req.token;
    const { password } = req.validatedData;

    const rta = await this.authModel.recoverPassword({
      newPassword: password,
      id: sub
    });

    if (!rta) return res.status(400).json({ error: 'Process failed' });

    res.status(200).json({ message: 'Password updated successfully' });
  };
}

export { AuthController };
