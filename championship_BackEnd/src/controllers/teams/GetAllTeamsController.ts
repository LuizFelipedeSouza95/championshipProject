import { Request, Response } from "express";
import { GetAllTeamsService } from "../../services/teams/GetAllTeamsService";

class GetAllTeamsController {
  async handle(req: Request, res: Response) {
    const sendTeams = new GetAllTeamsService();
    const teams = await sendTeams.execute();

    if (!teams) {
      res.status(204).json();
    }

    return res.status(200).json(teams);
  }
}

export { GetAllTeamsController };
