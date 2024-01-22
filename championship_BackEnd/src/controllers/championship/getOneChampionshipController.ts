import { Request, Response } from "express";
import { GetOneChampionshipService } from "../../services/championship/getOneChampionshipService";

export class GetOneChampionshipController {
  async handle(req: Request, res: Response) {
    const id = req.query.id as string;

    if (!id) {
      return res.status(400).json({ error: "Missing mandatory data" });
    }

    const getOneChampionshipService = new GetOneChampionshipService();
    const championship = await getOneChampionshipService.execute({ id });

    if (!championship) {
      res.status(204).json();
    }

    return res.status(200).json(championship);
  }
}
