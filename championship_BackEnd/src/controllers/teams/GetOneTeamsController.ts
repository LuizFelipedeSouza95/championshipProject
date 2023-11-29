import { Request, Response } from "express";
import { GetOneTeamsService } from "../../services/teams/GetOneTeamsService";

class GetOneTeamsController {
  async handle(req: Request, res: Response) {
    const teamName = req.query.team as string;

    if (!teamName) {
      return res.status(400).json({ error: "Missing mandatory data" });
    }

    const sendTeams = new GetOneTeamsService();
    const team = await sendTeams.execute({
      teamName,
    });

    if (!team) {
      res.status(204).json();
    }

    return res.status(200).json(team);
  }
}

export { GetOneTeamsController };
