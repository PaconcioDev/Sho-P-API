import { handleProcessFailure } from "../utils/handleProccessFailure.js";

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
      handleProcessFailure(res, 404, "User not found");
      return;
    }

    res.json(user);
  };

  create = async (req, res) => {
    const { validatedData } = req;

    const newUser = await this.userModel.create({ input: validatedData });
    if (newUser === "phone") {
      handleProcessFailure(res, 422, "User already registered");
      return;
    } else if (newUser === "email") {
      handleProcessFailure(res, 422, "User already registered");
      return;
    }

    res.status(201).json(newUser);
  };

  update = async (req, res) => {
    const { validatedData } = req;
    const { id } = req.params;
    const updatedUser = await this.userModel.update({
      id,
      input: validatedData,
    });

    if (!updatedUser) {
      handleProcessFailure(res, 404, "User not found");
      return;
    }

    if (updatedUser === "phone") {
      handleProcessFailure(res, 422, "User already registered");
      return;
    } else if (updatedUser === "email") {
      handleProcessFailure(res, 422, "User already registered");
      return;
    }

    res.status(200).json(updatedUser);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await this.userModel.delete({ id });

    if (!deletedUser) {
      handleProcessFailure(res, 404, "User not found");
      return;
    }

    res.status(200).json({ message: "User successfully deleted" });
  };
}

export { UserController };
