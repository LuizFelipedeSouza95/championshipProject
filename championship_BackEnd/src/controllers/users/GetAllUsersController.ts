import { Request, Response } from "express";
import { GetAllUsersService } from "../../services/users/GetAllUsersService";

class GetAllUsersController {
  async handle(req: Request, res: Response) {
    const sendUsers = new GetAllUsersService();
    const users = await sendUsers.execute();

    if (!users) {
      res.status(204).json();
    }

    return res.status(200).json(users);
  }
}

export { GetAllUsersController };
