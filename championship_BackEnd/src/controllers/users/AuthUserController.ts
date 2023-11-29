import { Request, Response } from "express";
import { AuthUserService } from "../../services/users/AuthUserService";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing mandatory data" });
    }

    const authUserService = new AuthUserService();

    const auth = await authUserService.execute({
      email,
      password,
    });

    if (!auth) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json(auth);
  }
}
