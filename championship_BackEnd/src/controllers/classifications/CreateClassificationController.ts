import prismaClient from "../../prisma/index";

import { Request, Response } from "express";
import { CreateClassificationService } from "../../services/classifications/CreateClassificationService";

export class CreateClassificationController {
  async handle(req: Request, res: Response) {
    const { team_id, namePlayer } = req.body;

    if (!team_id || !namePlayer) {
      return res.status(400).json({ error: "Missing mandatory data" });
    }

    const createUserService = new CreateClassificationService();
    const classification = await createUserService.execute({
      namePlayer,
      team_id,
    });

    if (classification === "Team not exist") {
      res.status(404).json({ error: "Team not exist" });
    }

    if (classification === "Player not exist") {
      res.status(404).json({ error: "Player not exist" });
    }

    if (!classification) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json(classification);
  }
}
