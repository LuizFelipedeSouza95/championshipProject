import { Request, Response } from "express";
import { DetailUserService } from "../../services/users/DetailUserService";

export class DetailUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    if (!user_id) {
      return res.status(400).json({ error: "Missing mandatory data" });
    }

    const detailUserService = new DetailUserService();
    const user = await detailUserService.execute(user_id);

    if (!user) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json(user);
  }
}
