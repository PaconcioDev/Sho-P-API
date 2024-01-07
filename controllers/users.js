import { validateUser } from "../schemas/users.js";

class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

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
}

export { UserController };
