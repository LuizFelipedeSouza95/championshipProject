import { Request, Response } from "express";
import { GetOneUsersService } from "../../services/users/GetOneUsersService";

class GetOneUsersController {
  async handle(req: Request, res: Response) {
    const email = req.query.email as string;

    if (!email) {
      return res.status(400).json({ error: "Missing mandatory data" });
    }

    const sendUser = new GetOneUsersService();
    const user = await sendUser.execute({
      email,
    });

    if (!user) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json(user);
  }
}

export { GetOneUsersController };
