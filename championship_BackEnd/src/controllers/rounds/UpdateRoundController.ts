import { Request, Response } from "express";
import { UpdateRoundService } from "../../services/rounds/UpdateRoundService";

class UpdateRoundController {
  async handle(req: Request, res: Response) {
    const { roundNumber, homePlayer, scoreHome, scoreVisiting } = req.body;

    if (!roundNumber || !homePlayer || !scoreHome || !scoreVisiting) {
      return res.status(400).json({ error: "Missing mandatory data" });
    }

    const sendRound = new UpdateRoundService();
    const round = await sendRound.execute({
      homePlayer,
      roundNumber,
      scoreHome,
      scoreVisiting,
    });

    if (!round) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json(round);
  }
}

export { UpdateRoundController };
