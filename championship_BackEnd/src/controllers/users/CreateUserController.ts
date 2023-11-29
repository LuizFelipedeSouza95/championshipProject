import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService";

export class CreateUsercontroller {
  async handle(req: Request, res: Response) {
    const { name, email, password, teamName } = req.body;

    if (!name || !email || !password || !teamName) {
      return res.status(400).json({ error: "Missing mandatory data" });
    }

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
      teamName,
    });

    if (!user) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(201).json(user);
  }
}
