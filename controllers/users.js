import { validateUser, validatePartialUser } from "../schemas/users.js";

class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    const usersJson = await this.userModel.getAll();
    res.json(usersJson);
  };

  findOne = async (req, res) => {
    const { id } = req.params;
    const user = await this.userModel.findOne({ id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  };

  create = async (req, res) => {
    const result = validateUser(req.body);

    if (result.error) {
      return res.status(422).json({
        error: JSON.parse(result.error.message),
      });
    }

    const newUser = await this.userModel.create({ input: result.data });

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

    res.status(201).json(newUser);
  };

  update = async (req, res) => {
    const result = validatePartialUser(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedUser = await this.userModel.update({
      id,
      input: result.data,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updatedUser === "phone") {
      res.status(422).json({
        message: "This phone number is already registered",
      });
      return;
    } else if (updatedUser === "email") {
      res.status(422).json({
        message: "This email is already registered",
      });
      return;
    }

    res.status(200).json(updatedUser);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await this.userModel.delete({ id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User successfully deleted" });
  };
}

export { UserController };
