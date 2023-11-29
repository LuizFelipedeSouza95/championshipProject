import { Request, Response } from "express";
import { GetAllClassificationService } from "../../services/classifications/GetAllClassificationService";

class GetAllClassificationController {
  async handle(req: Request, res: Response) {
    const sendClassification = new GetAllClassificationService();
    const classifications = await sendClassification.execute();

    if (!classifications) {
      res.status(204).json();
    }

    return res.status(200).json(classifications);
  }
}

export { GetAllClassificationController };
