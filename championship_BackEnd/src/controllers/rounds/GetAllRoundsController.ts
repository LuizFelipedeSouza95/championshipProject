import { Request, Response } from "express";
import { GetAllRoundsService } from "../../services/rounds/GetAllRoundsService";

class GetAllRoundsController {
  async handle(req: Request, res: Response) {
    const sendRounds = new GetAllRoundsService();
    const rounds = await sendRounds.execute();

    if (!rounds) {
      res.status(204).json();
    }

    return res.status(200).json(rounds);
  }
}

export { GetAllRoundsController };
