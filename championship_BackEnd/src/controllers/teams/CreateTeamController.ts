import { Request, Response } from "express";
import { CreateTeamsService } from "../../services/teams/CreateTeamsService";

export class CreateTeamController {
  async handle(req: Request, res: Response) {
    const createTeamsService = new CreateTeamsService();
    const teams = await createTeamsService.execute();

    if (!teams) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(201).json({ teams });
  }
}
