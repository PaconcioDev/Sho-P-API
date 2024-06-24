class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    const usersJson = await this.userModel.getAll();
    res.json(usersJson);
  };

  findOne = async (req, res) => {
    const { id } = req.params;
    const user = await this.userModel.findOne({ id });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  };

  create = async (req, res) => {
    const { validatedData } = req;

    const newUser = await this.userModel.create({ input: validatedData });

    if (newUser === 'phone' || newUser === 'email') { return res.status(422).json({ error: 'User already registered' }); }

    res.status(201).json(newUser);
  };

  update = async (req, res) => {
    const { validatedData } = req;
    const { id } = req.params;

    const updatedUser = await this.userModel.update({
      id,
      input: validatedData
    });

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    if (updatedUser === 'phone' || updatedUser === 'email') { return res.status(422).json({ error: 'User already registered' }); }

    res.status(200).json(updatedUser);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const deletedUser = await this.userModel.delete({
      id,
      password
    });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    } else if (deletedUser.message) {
      return res.status(401).json({ error: deletedUser.message });
    }

    res.status(200).json({ message: 'User successfully deleted' });
  };
}

export { UserController };
