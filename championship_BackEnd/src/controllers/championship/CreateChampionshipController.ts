import { Request, Response } from "express";
import { CreateChampionshipService } from "../../services/championship/CreateChampionshipService";

export class CreateChampionshipController {
  async handle(req: Request, res: Response) {
    const { name, maxPlayers, players } = req.body;

    if (!name || !maxPlayers) {
      return res.status(400).json({ error: "Missing mandatory data" });
    }

    const createChampionshipService = new CreateChampionshipService();
    const championship = await createChampionshipService.execute({
      name,
      maxPlayers,
      players,
    });

    if (!championship) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json(championship);
  }
}
