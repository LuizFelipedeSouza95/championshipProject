import { Request, Response } from "express";
import { UpdateClassificationService } from "../../services/classifications/UpdateClassificationService";

class UpdateClassificationController {
  async handle(req: Request, res: Response) {
    const { namePlayer1, scorePlayer1, namePlayer2, scorePlayer2 } = req.body;

    if (!namePlayer1 || !scorePlayer1 || !namePlayer2 || !scorePlayer2) {
      return res.status(400).json({ error: "Missing mandatory data" });
    }

    const sendClassification = new UpdateClassificationService();
    const classifications = await sendClassification.execute({
      namePlayer1,
      scorePlayer1,
      namePlayer2,
      scorePlayer2,
    });

    if (!classifications) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json(classifications);
  }
}

export { UpdateClassificationController };
