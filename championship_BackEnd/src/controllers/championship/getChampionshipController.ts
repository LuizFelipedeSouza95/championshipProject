import { Request, Response } from "express";
import { GetChampionshipService } from "../../services/championship/getChampionshipService";

export class GetChampionshipController {
  async handle(req: Request, res: Response) {
    const getChampionshipService = new GetChampionshipService();
    const championship = await getChampionshipService.execute();

    if (!championship) {
      return res.status(204)
    }

    return res.status(200).json(championship);
  }
}
